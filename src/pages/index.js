import Head from "next/head";
import Container from "@/components/Container";
import Footer from "@/components/Footer";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Loading from '@/components/Loading';
import styles from '@/styles/Catalogo.module.css';
import { getPokemons } from '@/services/api';
import { FaRulerVertical, FaBalanceScale, FaCircle } from 'react-icons/fa';

export default function Home() {
  const [pokemons, setPokemons] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    async function carregar() {
      try {
        const dados = await getPokemons();
        setPokemons(dados);
      } catch (err) {
        setErro('Falha ao carregar. Tente novamente mais tarde.');
      } finally {
        setCarregando(false);
      }
    }
    carregar();
  }, []);

  if (carregando) return <Loading />;

  return (
    <>
      <Head>
        <title>Catálogo de Pokémons | PokéAPI</title>
        <meta name="description" content="Catálogo interativo — Consumo de API com Next.js" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main className={styles.pagina}>
        <Container>
          <div className={styles.cabecalho}>
            <h1 className={styles.tituloPrincipal}>⚡ Catálogo de Pokémons</h1>
            <p className={styles.subtitulo}>Dados fornecidos por PokéAPI</p>
            <div className={styles.linha}></div>
          </div>
          
          {erro ? (
            <div className={styles.caixaErro}>
              <span className={styles.iconeErro}>⚠️</span>
              <p>{erro}</p>
            </div>
          ) : (
            <div className={styles.gradeJogos}>
              {pokemons && pokemons.length > 0 ? (
                pokemons.map((pokemon) => (
                  <Link 
                    key={pokemon.id} 
                    href={`/pokemon/${pokemon.id}`}
                    className={styles.cartaoLink}
                  >
                    <article className={styles.cartao}>
                      <div className={styles.imagemWrapper}>
                        {pokemon.image ? (
                          <img 
                            src={pokemon.image} 
                            alt={pokemon.name}
                            className={styles.imagemJogo}
                            loading="lazy"
                          />
                        ) : (
                          <div className={styles.semImagem}>⚡</div>
                        )}
                      </div>
                      <div className={styles.conteudoCartao}>
                        <h2 className={styles.nomeJogo}>#{pokemon.id} {pokemon.name}</h2>
                        <div className={styles.infoLinha}>
                          <span className={styles.rotulo}>📏 Altura:</span>
                          <span>{pokemon.height ?? '—'} m</span>
                        </div>
                        <div className={styles.infoLinha}>
                          <span className={styles.rotulo}>⚖️ Peso:</span>
                          <span>{pokemon.weight ?? '—'} kg</span>
                        </div>
                        <div className={styles.infoPlataformas}>
                          <span className={styles.rotulo}>🔴 Tipos:</span>
                          <span>
                            {pokemon.types?.join(' • ') || 'Desconhecido'}
                          </span>
                        </div>
                        <span className={styles.verDetalhes}>Ver detalhes →</span>
                      </div>
                    </article>
                  </Link>
                ))
              ) : (
                <p className={styles.semDados}>Nenhum Pokémon encontrado.</p>
              )}
            </div>
          )}
        </Container>
      </main>
      
      <Footer />
    </>
  );
}
