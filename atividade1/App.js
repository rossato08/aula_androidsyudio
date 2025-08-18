import React, { useState } from 'react';
import { View, TouchableOpacity, Text, ScrollView } from 'react-native';
import { estilos } from './style';

export default function App() {
  const [estiloSelecionado, setEstiloSelecionado] = useState(null);

  const botoes = [
    {
      id: 1,
      rotulo: 'Redondo Verde',
      estilo: {
        backgroundColor: '#4CAF50',
        width: 80,
        height: 80,
        borderRadius: 40,
        margin: 5
      }
    },
    {
      id: 2,
      rotulo: 'Quadrado Azul',
      estilo: {
        backgroundColor: '#2196F3',
        width: 80,
        height: 80,
        borderRadius: 0,
        margin: 5
      }
    },
    {
      id: 3,
      rotulo: 'Oval Laranja',
      estilo: {
        backgroundColor: '#FF9800',
        width: 100,
        height: 60,
        borderRadius: 30,
        margin: 5
      }
    },
    {
      id: 4,
      rotulo: 'Retângulo Roxo',
      estilo: {
        backgroundColor: '#9C27B0',
        width: 120,
        height: 120,
        borderRadius: 10,
        margin: 5
      }
    }
  ];

  function mostrarEstilo(estiloDoBotao) {
    const estiloFormatado = JSON.stringify(estiloDoBotao, null, 2);
    setEstiloSelecionado(estiloFormatado);
  }

  function limparEstilo() {
    setEstiloSelecionado(null);
  }

  return (
    <ScrollView contentContainerStyle={estilos.container}>
      {/* Primeira linha */}
      <View style={estilos.linha}>
        {botoes.slice(0, 2).map((botao) => (
          <TouchableOpacity
            key={botao.id}
            style={botao.estilo}
            onPress={() => mostrarEstilo(botao.estilo)}
          />
        ))}
      </View>

      {/* Segunda linha */}
      <View style={estilos.linha}>
        {botoes.slice(2, 4).map((botao) => (
          <TouchableOpacity
            key={botao.id}
            style={botao.estilo}
            onPress={() => mostrarEstilo(botao.estilo)}
          />
        ))}
      </View>

      {/* Área de exibição do estilo */}
      {estiloSelecionado && (
        <View style={estilos.caixaDeCodigo}>
          <Text style={estilos.textoCodigo}>{estiloSelecionado}</Text>
          <TouchableOpacity style={estilos.botaoLimpar} onPress={limparEstilo}>
            <Text style={estilos.textoBotaoLimpar}>Limpar</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}
