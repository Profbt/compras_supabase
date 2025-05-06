// Importa a função de criação do client Supabase via CDN
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// Cria o client com a URL e a chave fornecidas
export const supabase = createClient(
  'https://wqrvadycionozczmqgoj.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
)
