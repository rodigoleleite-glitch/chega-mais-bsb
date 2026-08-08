-- Revoke EXECUTE from PUBLIC (anon and authenticated) on the security definer functions
-- Only service_role and postgres should be able to execute these directly if they are sensitive
-- and for the trigger, it's executed by the system.

REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC;

-- Grant EXECUTE back to authenticated for has_role since it might be used in app code/RLS
-- Actually RLS uses it as the table owner (postgres/service_role), but if we want to call it from client:
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated;

-- Ensure user_roles has a policy (even if it's just for admins or service_role)
-- The linter said "RLS Enabled No Policy" for user_roles probably.
CREATE POLICY "Admins can view all roles" ON public.user_roles
FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can view their own roles" ON public.user_roles
FOR SELECT TO authenticated
USING (auth.uid() = user_id);
