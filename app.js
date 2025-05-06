import { supabase } from './supabaseClient.js'

// Recupera o usuário logado. Redireciona para login se não estiver autenticado.
async function getUser() {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) window.location.href = 'login.html'
  return user
}

// Elementos da página
const lista = document.getElementById('lista')
const input = document.getElementById('item')

// Função para carregar a lista de itens do banco
async function carregarLista() {
  const { data, error } = await supabase.from('lista_compras').select('*')
  if (error) console.error(error)

  // Limpa a lista atual
  lista.innerHTML = ''

  // Adiciona cada item como <li> com botão para remover
  data.forEach((item) => {
    const li = document.createElement('li')
    li.innerHTML = `${item.item} <button onclick="removerItem(${item.id})">Remover</button>`
    lista.appendChild(li)
  })
}

// Função para adicionar novo item à lista
window.adicionarItem = async function () {
  const user = await getUser()
  const { error } = await supabase.from('lista_compras').insert({
    item: input.value,
    adicionada_por: user.id
  })
  if (error) return alert('Erro ao adicionar')
  input.value = ''
  carregarLista()
}

// Função para remover item pelo ID
window.removerItem = async function (id) {
  const { error } = await supabase.from('lista_compras').delete().eq('id', id)
  if (error) return alert('Erro ao remover')
  carregarLista()
}

// Função para logout
window.logout = async function () {
  await supabase.auth.signOut()
  window.location.href = 'login.html'
}

// Inicializa ao abrir página
getUser().then(carregarLista)
