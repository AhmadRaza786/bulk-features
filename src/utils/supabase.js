const { createClient } = require("@supabase/supabase-js");
const { TABLE_NAME, supabaseKey, supabaseUrl } = require("./constants");

const supabase = createClient(supabaseUrl, supabaseKey);

const insert = async (tableName, data) => {
  const { error, data: result } = await supabase
    .from(tableName)
    .insert(data)
    .select();
  return { error, data: result };
};

const getAllVendors = async () => {
  const { data, error } = await supabase.from(TABLE_NAME.VENDORS).select(`
  id, 
  name,
  date, 
  ${TABLE_NAME.ORDERS} ( * )
`);
  return { error, data };
};

module.exports = { insert, getAllVendors };
