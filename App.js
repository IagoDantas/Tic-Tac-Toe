import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import {
  useFonts,
  Inter_900Black,
  Inter_600SemiBold,
} from '@expo-google-fonts/inter';

export default function App() {
  const [tela, setTela] = useState('menu')
  const [jogadorAtual, setJogadorAtual] = useState('')
  const [tabuleiro, setTabuleiro] = useState([])
  const [jogadasRestantes, setJogadasRestantes] = useState(0)
  const [ganhador, setGanhador] = useState('')
  let [fontsLoaded] = useFonts({
    Inter_900Black,
    Inter_600SemiBold,
 });

  function iniciarJogo(jogador) {
    setJogadorAtual(jogador);

    setJogadasRestantes(9);
    setTabuleiro([
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ])

    setTela('jogo')

  }
  function jogar(linha, coluna) {
    tabuleiro[linha][coluna] = jogadorAtual;
    setTabuleiro([...tabuleiro])

    setJogadorAtual(jogadorAtual === 'X' ? 'O' : 'X')

    verificarGanhador(tabuleiro, linha, coluna);

  }

  function verificarGanhador(tabuleiro, linha, coluna) {
    //LINHAS
    if (tabuleiro[linha][0] !== '' && tabuleiro[linha][0] === tabuleiro[linha][1] && tabuleiro[linha][1] === tabuleiro[linha][2]) {
      return finalizarJogo(tabuleiro[linha][0])
    }
    //COLUNAS
    if (tabuleiro[0][coluna] !== '' && tabuleiro[0][coluna] === tabuleiro[1][coluna] && tabuleiro[1][coluna] === tabuleiro[2][coluna]) {
      return finalizarJogo(tabuleiro[1][coluna])
    }

    //DIAGONAL 1
    if (tabuleiro[0][0] !== '' && tabuleiro[0][0] === tabuleiro[1][1] && tabuleiro[1][1] === tabuleiro[2][2]) {
      return finalizarJogo(tabuleiro[0][0])
    }

    //DIAGONAL 2
    if (tabuleiro[0][2] !== '' && tabuleiro[0][2] === tabuleiro[1][1] && tabuleiro[1][1] === tabuleiro[2][0]) {
      return finalizarJogo(tabuleiro[0][2])
    }

    //NENHUM GANHADOR
    if (jogadasRestantes - 1 === 0) {
      return finalizarJogo('')
    }
    //JOGO NÃO FINALIZADO
    setJogadasRestantes((jogadasRestantes - 1))
  }

  function finalizarJogo(jogador) {
    setGanhador(jogador);
    setTela('ganhador')
  }

  switch (tela) {
    case 'menu':
      return getTelaMenu();
    case 'jogo':
      return getTelaJogo();
    case 'ganhador':
      return getTelaGanhador();
  }

  function getTelaMenu() {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Text style={styles.titulo}>Jogo da Velha</Text>
        <Text style={styles.subtitulo}>Selecione o primeiro jogador</Text>

        <View style={styles.inlineItems}>
          <TouchableOpacity
            style={styles.boxJogador}
            onPress={() => iniciarJogo('X')}>
            <Text style={styles.jogadorX}>X</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.boxJogador}
            onPress={() => iniciarJogo('O')}>
            <Text style={styles.jogadorO}>O</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  function getTelaJogo() {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Text style={styles.titulo}>Jogo da Velha</Text>

        {
          tabuleiro.map((linha, numeroLinha) => {
            return (
              <View key={numeroLinha} style={styles.inlineItems}>
                {
                  linha.map((coluna, numeroColuna) => {
                    return (
                      <TouchableOpacity
                        key={numeroColuna}
                        style={styles.boxJogador}
                        onPress={() => jogar(numeroLinha, numeroColuna)}
                        disabled={coluna !== ''}>
                        <Text style={coluna === 'X' ? styles.jogadorX : styles.jogadorO}>{coluna}</Text>
                      </TouchableOpacity>
                    )
                  })
                }
              </View>

            )
          })
        }
        <TouchableOpacity
          style={styles.botaoMenu}
          onPress={() => setTela('menu')}>
          <Text style={styles.textoBotaoMenu}>Voltar ao menu</Text>
        </TouchableOpacity>
      </View>
    );
  }

  function getTelaGanhador() {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Text style={styles.titulo}>Jogo da Velha</Text>
        <Text style={styles.subtitulo}>Resultado final</Text>

        {
          ganhador === '' &&
          <Text style={styles.ganhador}>Nenhum ganhador</Text>
        }
        {
          ganhador !== '' &&
          <>
            <Text style={styles.ganhador}>Ganhador</Text>
            <View
              style={styles.boxJogador}>
              <Text style={ganhador === 'X' ? styles.jogadorX : styles.jogadorO}>{ganhador}</Text>
            </View>
          </>
        }


        <TouchableOpacity
          style={styles.botaoMenu}
          onPress={() => setTela('menu')}>
          <Text style={styles.textoBotaoMenu}>Voltar ao menu</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 30,
    color: "#262626",
    fontFamily: 'Inter_900Black',
  },
  subtitulo: {
    fontSize: 20,
    color: '#262626',
    marginTop: 20,
    fontFamily: 'Inter_600SemiBold',
  },
  boxJogador: {
    width: 80,
    height: 80,
    backgroundColor: '#262626',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    borderRadius: 15,
    marginTop: 20,
  },
  jogadorX: {
    fontSize: 40,
    color: '#F0CBAA',
    fontFamily: 'Inter_600SemiBold',
  },
  jogadorO: {
    fontSize: 40,
    color: '#7B9EA6',
    fontFamily: 'Inter_600SemiBold',
  },
  inlineItems: {
    flexDirection: 'row'
  },
  botaoMenu: {
    marginTop: 20,
  },
  textoBotaoMenu: {
    fontFamily: 'Inter_600SemiBold',
    color: "#6479A3"
  },
  ganhador: {
    fontSize: 30,
    color: '#333',
    fontFamily: 'Inter_900Black',

  }
});
