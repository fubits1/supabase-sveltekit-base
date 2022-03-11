import {
  createClient
} from '@supabase/supabase-js'

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

// TODO: add your queries/inserts/updates/deletes here
export const countries = {
  async all() {
    const {
      data,
      error
    } = await supabase
      .from('countries')
      .select("*")
      .order('name')
    return data
  }
}
