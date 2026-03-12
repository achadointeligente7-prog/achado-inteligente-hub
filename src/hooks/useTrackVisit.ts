import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export function useTrackVisit(page: string = "/") {
  useEffect(() => {
    supabase
      .from("site_visits")
      .insert({
        page,
        user_agent: navigator.userAgent,
        referrer: document.referrer || null,
      })
      .then(() => {});
  }, [page]);
}
