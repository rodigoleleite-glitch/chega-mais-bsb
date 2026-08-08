import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

export const getExperiences = createServerFn({ method: "GET" })
  .handler(async () => {
    const { data, error } = await supabase
      .from('experiences')
      .select('*')
      .order('date', { ascending: true });
    
    if (error) throw error;
    return data;
  });

export const getExperienceBySlug = createServerFn({ method: "GET" })
  .inputValidator((slug: string) => z.string().parse(slug))
  .handler(async ({ data: slug }) => {
    const { data, error } = await supabase
      .from('experiences')
      .select('*')
      .eq('slug', slug)
      .single();
    
    if (error) throw error;
    return data;
  });

export const createExperience = createServerFn({ method: "POST" })
  .inputValidator((data: any) => z.object({
    slug: z.string(),
    title: z.string(),
    category: z.string(),
    date: z.string(),
    display_date: z.string(),
    time: z.string(),
    location: z.string(),
    google_maps_url: z.string().nullable().optional(),
    short_description: z.string(),
    long_description: z.string(),
    price: z.string(),
    vacancies: z.string(),
    status: z.enum(['available', 'sold-out']),
    image_url: z.string().nullable().optional(),
    includes: z.array(z.string()),
    for_who: z.array(z.string()),
  }).parse(data))
  .handler(async ({ data }) => {
    const { data: result, error } = await supabase
      .from('experiences')
      .insert(data)
      .select()
      .single();
    
    if (error) throw error;
    return result;
  });

export const updateExperience = createServerFn({ method: "POST" })
  .inputValidator((data: any) => z.object({
    id: z.string(),
    updates: z.any()
  }).parse(data))
  .handler(async ({ data }) => {
    const { data: result, error } = await supabase
      .from('experiences')
      .update(data.updates)
      .eq('id', data.id)
      .select()
      .single();
    
    if (error) throw error;
    return result;
  });

export const deleteExperience = createServerFn({ method: "POST" })
  .inputValidator((id: string) => z.string().parse(id))
  .handler(async ({ data: id }) => {
    const { error } = await supabase
      .from('experiences')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return { success: true };
  });

export const checkIsAdmin = createServerFn({ method: "GET" })
  .handler(async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return false;

    const { data, error } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .eq('role', 'admin')
      .single();
    
    if (error || !data) return false;
    return true;
  });
