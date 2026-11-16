import Head from 'next/head';
import Container from '@/components/Container';
import Footer from '@/components/Footer';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Loading from '@/components/Loading';
import { getPokemonById } from '@/services/api';
import styles from '@/styles/Detalhes.module.css';

export default function DetalhesPokemon() {
  const router = useRouter();
  const { id } = router.query;
  const [pokemon, setPokemon] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    if (!id) return;

    async function carregar() {
      try {
        const dados = await getPokemonById(id);
        setPokemon(dados);
      } catch (err) {
        setErro('Não foi possível carregar os detalhes.');
      } finally {
        setCarregando(false);
      }
    }

    carregar();
  }, [id]);

  if (carregando) return <Loading />;

  if (erro || !pokemon) {
    return (
      <div className={styles.paginaErro}>
        <Head>
          <title>Pokémon Não Encontrado</title>
        </Head>
        <Container>
          <div className={styles.caixaErro}>
            <h2>😕 Pokémon não encontrado</h2>
            <p>{erro}</p>
            <Link href="/" className={styles.botaoVoltar}>← Voltar ao Catálogo</Link>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{pokemon.name} | Detalhes</title>
        <meta name="description" content={`Saiba tudo sobre ${pokemon.name}`} />
      </Head>
      
      <main className={styles.pagina}>
  <Container>
    <Link href="/" className={styles.botaoVoltar}>← Voltar ao Catálogo</Link>

    <div className={styles.cartaoPrincipal}>
      {pokemon.image && (
        <div className={styles.capaWrapper}>
          <img 
            src={pokemon.image} 
            alt={pokemon.name}
            className={styles.capa}
          />
        </div>
      )}
            <div className={styles.conteudo}>
  <h1 className={styles.nomeJogo}>#{pokemon.id} {pokemon.name}</h1>

  <div className={styles.infoLinha}>
    <span className={styles.rotulo}>🔴 Tipos:</span>
    <span>{pokemon.types?.join(' • ') || '—'}</span>
  </div>

  <div className={styles.infoLinha}>
    <span className={styles.rotulo}>📏 Altura:</span>
    <span>{pokemon.height} m</span>
  </div>

  <div className={styles.infoLinha}>
    <span className={styles.rotulo}>⚖️ Peso:</span>
    <span>{pokemon.weight} kg</span>
  </div>

  <div className={styles.infoLinha}>
    <span className={styles.rotulo}>💪 Habilidades:</span>
    <span>{pokemon.abilities?.join(' • ') || '—'}</span>
  </div>

  <div className={styles.infoLinha}>
    <span className={styles.rotulo}>📊 Estatísticas:</span>
    <div className={styles.estatisticas}>
      {pokemon.stats?.map((stat, index) => (
        <div key={index} className={styles.linhaStat}>
          <span className={styles.nomeStat}>{stat.name}:</span>
          <span className={styles.valorStat}>{stat.value}</span>
        </div>
      ))}
    </div>
  </div>
</div>

          </div>
        </Container>
      </main>
      
      <Footer />
    </>
  );
}
