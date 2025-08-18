import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

export default function App() {
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [resultado, setResultado] = useState(null);

  const calcularIMC = () => {
    if (!peso || !altura) {
      setResultado('Por favor, informe peso e altura.');
      return;
    }

    const pesoNum = parseFloat(peso);
    const alturaNum = parseFloat(altura) / 100; // altura em metros

    if (isNaN(pesoNum) || isNaN(alturaNum) || alturaNum <= 0) {
      setResultado('Valores inválidos.');
      return;
    }

    const imc = pesoNum / (alturaNum * alturaNum);

    let classificacao = '';
    if (imc < 18.5) classificacao = 'Abaixo do peso';
    else if (imc < 24.9) classificacao = 'Peso normal';
    else if (imc < 29.9) classificacao = 'Sobrepeso';
    else classificacao = 'Obesidade';

    setResultado(`IMC: ${imc.toFixed(2)} - ${classificacao}`);
  };

  const limpar = () => {
    setPeso('');
    setAltura('');
    setResultado(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Calculadora de IMC</Text>

      <TextInput
        style={styles.input}
        placeholder="Informe seu peso (kg)"
        keyboardType="numeric"
        value={peso}
        onChangeText={setPeso}
      />

      <TextInput
        style={styles.input}
        placeholder="Informe sua altura (cm)"
        keyboardType="numeric"
        value={altura}
        onChangeText={setAltura}
      />

      <TouchableOpacity style={styles.botao} onPress={calcularIMC}>
        <Text style={styles.textoBotao}>Calcular</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.botao, styles.botaoLimpar]} onPress={limpar}>
        <Text style={styles.textoBotao}>Limpar</Text>
      </TouchableOpacity>

      {resultado && <Text style={styles.resultado}>{resultado}</Text>}

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  botao: {
    width: '100%',
    height: 50,
    backgroundColor: '#007BFF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
  },
  botaoLimpar: {
    backgroundColor: '#dc3545',
  },
  textoBotao: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resultado: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
