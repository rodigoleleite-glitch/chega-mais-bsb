-- 1. Create app_role enum
create type public.app_role as enum ('admin', 'user');

-- 2. Create user_roles table
create table public.user_roles (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references auth.users(id) on delete cascade not null,
    role app_role not null,
    unique (user_id, role)
);

grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;

alter table public.user_roles enable row level security;

-- 3. Create security definer function for has_role
create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.user_roles
    where user_id = _user_id
      and role = _role
  )
$$;

-- 4. Create profiles table
create table public.profiles (
    id uuid primary key references auth.users(id) on delete cascade,
    full_name text,
    avatar_url text,
    updated_at timestamp with time zone default now()
);

grant select, update on public.profiles to authenticated;
grant all on public.profiles to service_role;

alter table public.profiles enable row level security;

create policy "Users can view their own profile"
on public.profiles for select
to authenticated
using (auth.uid() = id);

create policy "Users can update their own profile"
on public.profiles for update
to authenticated
using (auth.uid() = id);

-- 5. Create experiences table
create table public.experiences (
    id uuid primary key default gen_random_uuid(),
    slug text unique not null,
    title text not null,
    category text not null,
    date date not null,
    display_date text not null,
    time text not null,
    location text not null,
    google_maps_url text,
    short_description text not null,
    long_description text not null,
    price text not null,
    vacancies text not null,
    status text not null check (status in ('available', 'sold-out')),
    image_url text,
    includes text[] default '{}',
    for_who text[] default '{}',
    created_at timestamp with time zone default now(),
    created_by uuid references auth.users(id)
);

grant select on public.experiences to anon;
grant select on public.experiences to authenticated;
grant insert, update, delete on public.experiences to authenticated;
grant all on public.experiences to service_role;

alter table public.experiences enable row level security;

create policy "Anyone can view experiences"
on public.experiences for select
to anon, authenticated
using (true);

create policy "Admins can insert experiences"
on public.experiences for insert
to authenticated
with check (public.has_role(auth.uid(), 'admin'));

create policy "Admins can update experiences"
on public.experiences for update
to authenticated
using (public.has_role(auth.uid(), 'admin'));

create policy "Admins can delete experiences"
on public.experiences for delete
to authenticated
using (public.has_role(auth.uid(), 'admin'));

-- 6. Trigger to create profile on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 7. Insert demo data
INSERT INTO public.experiences (slug, title, category, date, display_date, time, location, google_maps_url, short_description, long_description, price, vacancies, status, includes, for_who)
VALUES 
('cafe-e-pintura', 'Café & Pintura', 'Arte', '2024-08-24', '24 Ago', '09:00 - 12:00', 'Asa Norte, Brasília', 'https://www.google.com/maps/search/?api=1&query=Asa+Norte+Brasilia', 'Uma manhã criativa para conversar, pintar e conhecer novas pessoas.', 'O Café & Pintura não é sobre saber pintar. É sobre desacelerar, conversar, conhecer mulheres incríveis e permitir que novas histórias aconteçam naturalmente. Em um ambiente acolhedor, vamos explorar cores e formas enquanto desfrutamos de um café especial.', 'R$ 120', '2 vagas', 'available', ARRAY['Materiais de pintura', 'Orientação da atividade', 'Espaço reservado', 'Networking', 'Experiência Chega Mais'], ARRAY['Quem quer conhecer pessoas novas', 'Quem quer sair da rotina', 'Quem vai participar sozinha', 'Quem procura novas amizades', 'Quem gosta de experiências criativas']),
('trilha-e-piquenique', 'Trilha & Piquenique', 'Outdoor', '2024-09-02', '02 Set', '08:00 - 11:00', 'Parque da Cidade, Brasília', 'https://www.google.com/maps/search/?api=1&query=Parque+da+Cidade+Brasilia', 'Uma experiência leve para mulheres que querem sair da rotina e criar novas amizades.', 'Conecte-se com a natureza e com outras mulheres em uma trilha leve seguida de um piquenique compartilhado. Uma oportunidade perfeita para respirar ar puro e trocar experiências em um cenário inspirador.', 'R$ 80', 'Esgotado', 'sold-out', ARRAY['Guia da trilha', 'Frutas e hidratação', 'Kit piquenique', 'Networking', 'Experiência Chega Mais'], ARRAY['Quem quer conhecer pessoas novas', 'Quem quer sair da rotina', 'Quem vai participar sozinha', 'Quem procura novas amizades', 'Quem gosta de atividades ao ar livre']);
