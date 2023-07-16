const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = "https://kmpauzcweclbwpkaoqrq.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImttcGF1emN3ZWNsYndwa2FvcXJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODk0NTE3MDIsImV4cCI6MjAwNTAyNzcwMn0.RnuX1d2aeA4RyWmqe16XyD2L-d6VavlB-CroQcFUhps";
const supabase = createClient(supabaseUrl, supabaseKey);

const insert = async (tableName, data) => {
  const { error, data: result } = await supabase
    .from(tableName)
    .insert(data)
    .select();
  return { error, data: result };
};

module.exports = { insert };
