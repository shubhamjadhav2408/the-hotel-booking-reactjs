import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://khypohxrghysomadcjzk.supabase.co";

const supabaseKey =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtoeXBvaHhyZ2h5c29tYWRjanprIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ0NTU3MTYsImV4cCI6MjA4MDAzMTcxNn0.ikOzEMvt-SoBHipWLcDN720zgqKTSlJ10UgPdt0Fi28";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
