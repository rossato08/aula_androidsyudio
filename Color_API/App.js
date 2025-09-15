import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import styles from './styles';

// Componente principal da aplicação
export default function App() {
  // Estado para a cor selecionada
  const [corSelecionada, setCorSelecionada] = useState({ hex: null, nome: null, nomeTraduzido: null });
  // Estado para o input do código HEX
  const [entradaHex, setEntradaHex] = useState('');
  // Estado para o input do idioma
  const [entradaIdioma, setEntradaIdioma] = useState('');
  // Estado para mensagens de erro
  const [erro, setErro] = useState('');

  // Configurações da API do Microsoft Translator
  const chave = 'G6m3TXGl3VNWUXStkO6XqwGsj9vMK3p8ZmkdqnYFGCA8bwN33yYSJQQJ99BIACULyCpXJ3w3AAAbACOGwdd4';
  const endpoint = 'https://api.cognitive.microsofttranslator.com';
  const regiao = 'global';

  // Busca o nome da cor pelo código HEX
  const buscarNomeCor = async (hex) => {
    try {
      const res = await fetch(`https://www.thecolorapi.com/id?hex=${hex}`);
      if (!res.ok) throw new Error('Erro ao buscar nome da cor');
      const data = await res.json();
      return data.name.value;
    } catch (err) {
      setErro('Erro ao buscar nome da cor');
      return 'Cor Desconhecida';
    }
  };

  // Traduz o nome da cor para o idioma especificado
  const traduzirNomeCor = async (nomeCor, idiomaDestino) => {
    try {
      const response = await fetch(
        `${endpoint}/translate?api-version=3.0&from=en&to=${idiomaDestino}`,
        {
          method: 'POST',
          headers: {
            'Ocp-Apim-Subscription-Key': chave,
            'Ocp-Apim-Subscription-Region': regiao,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify([{ text: nomeCor }]),
        }
      );

      if (!response.ok) throw new Error(`Erro na tradução: ${response.statusText}`);
      const data = await response.json();
      setErro('');
      return data[0].translations[0].text;
    } catch (err) {
      setErro(`Erro na tradução para "${idiomaDestino}": ${err.message}`);
      return nomeCor;
    }
  };

  // Lida com a entrada do código HEX
  const lidarEntradaHex = async (texto) => {
    const textoLimpo = texto.replace(/[^0-9A-Fa-f]/g, '').toUpperCase();
    setEntradaHex(textoLimpo);
    setErro('');

    if (textoLimpo.length === 3 || textoLimpo.length === 6) {
      const valorHex = `#${textoLimpo}`;
      const nomeCor = await buscarNomeCor(textoLimpo);
      const nomeTraduzido = entradaIdioma
        ? await traduzirNomeCor(nomeCor, entradaIdioma)
        : nomeCor;
      setCorSelecionada({ hex: valorHex, nome: nomeCor, nomeTraduzido });
    } else {
      setCorSelecionada({ hex: null, nome: null, nomeTraduzido: null });
    }
  };

  // Lida com a entrada do idioma
  const lidarEntradaIdioma = async (texto) => {
    const textoLimpo = texto.replace(/[^a-zA-Z-]/g, '').toLowerCase();
    setEntradaIdioma(textoLimpo);
    setErro('');

    if (corSelecionada.nome && textoLimpo) {
      const nomeTraduzido = await traduzirNomeCor(corSelecionada.nome, textoLimpo);
      setCorSelecionada({ ...corSelecionada, nomeTraduzido });
    } else {
      setCorSelecionada({ ...corSelecionada, nomeTraduzido: corSelecionada.nome });
    }
  };

  // Limpa todos os campos
  const limparCorSelecionada = () => {
    setCorSelecionada({ hex: null, nome: null, nomeTraduzido: null });
    setEntradaHex('');
    setEntradaIdioma('');
    setErro('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cores</Text>

      {erro && <Text style={styles.errorText}>{erro}</Text>}

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.hexInput}
          placeholder="Digite o código HEX (ex: FF5733)"
          value={entradaHex}
          onChangeText={lidarEntradaHex}
          maxLength={6}
          autoCapitalize="characters"
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.hexInput}
          placeholder="Digite a língua (ex: pt, es, fr)"
          value={entradaIdioma}
          onChangeText={lidarEntradaIdioma}
          maxLength={7}
          autoCapitalize="none"
        />
      </View>

      <View style={styles.selectedColorBox}>
        <View
          style={[
            styles.selectedColorSquare,
            corSelecionada.hex && { backgroundColor: corSelecionada.hex },
          ]}
        >
          {corSelecionada.hex ? (
            <>
              <Text style={styles.selectedColorText}>Cor</Text>
              <Text style={styles.selectedColorHex}>{corSelecionada.hex}</Text>
            </>
          ) : (
            <Text style={styles.selectedColorText}>Digite ou selecione uma cor</Text>
          )}
        </View>
        {corSelecionada.hex && (
          <TouchableOpacity style={styles.clearButton} onPress={limparCorSelecionada}>
            <Text style={styles.clearButtonText}>Limpar</Text>
          </TouchableOpacity>
        )}
      </View>
      {corSelecionada.hex && (
        <View style={styles.colorNameContainer}>
          <Text style={styles.selectedColorName}>
            Nome Original: {corSelecionada.nome}
          </Text>
          {corSelecionada.nomeTraduzido !== corSelecionada.nome && (
            <Text style={styles.selectedColorName}>
              Nome Traduzido: {corSelecionada.nomeTraduzido}
            </Text>
          )}
        </View>
      )}
    </View>
  );
}