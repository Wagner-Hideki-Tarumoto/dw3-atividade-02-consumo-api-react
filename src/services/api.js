export async function getPokemons(limit = 20) {
  const url = "https://pokeapi.co/api/v2/pokemon?limit=" + limit;
  console.log("Buscando:", url);

  try {
    const res = await fetch(url, { cache: 'no-store' });
    console.log("Resposta status:", res.status);
    
    if (!res.ok) {
      throw new Error("Erro na resposta: " + res.status);
    }

    const dados = await res.json();
    console.log("Quantidade recebida:", dados.results.length);

    const lista = [];
    for (let i = 0; i < dados.results.length; i++) {
      const poke = dados.results[i];
      const id = i + 1;
      
      const detalheRes = await fetch("https://pokeapi.co/api/v2/pokemon/" + id, { cache: 'no-store' });
      const detalhe = await detalheRes.json();
      
      lista.push({
        id: id,
        name: poke.name,
        image: detalhe.sprites?.other?.['official-artwork']?.front_default || "",
        height: detalhe.height / 10,
        weight: detalhe.weight / 10,
        types: detalhe.types?.map(t => t.type.name) || []
      });
    }
    return lista;
  } catch (erro) {
    console.error("ERRO CAPTURADO:", erro.message);
    throw erro;
  }
}

export async function getPokemonById(id) {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon/" + id, { cache: 'no-store' });
  const dados = await res.json();
  return {
    id: dados.id,
    name: dados.name,
    image: dados.sprites?.other?.['official-artwork']?.front_default || "",
    height: dados.height / 10,
    weight: dados.weight / 10,
    types: dados.types?.map(t => t.type.name) || [],
    abilities: dados.abilities?.map(a => a.ability.name) || [],
    stats: dados.stats?.map(s => ({ name: s.stat.name, value: s.base_stat })) || []
  };
}
