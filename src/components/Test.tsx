import { useEffect, useState } from "react";
import { testSupabase } from "../services/supabaseTest";

export default function TestSupabase() {
  const [status, setStatus] = useState("Checking Supabase connection...");

  useEffect(() => {
    testSupabase().then(result => {
      setStatus(result.message);
    });
  }, []);

  return (
    <div style={{ padding: "20px", fontSize: "18px" }}>
      {status}
    </div>
  );
}
