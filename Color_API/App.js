import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import styles from './styles';

export default function App() {
  const [selectedColor, setSelectedColor] = useState({ hex: null, name: null, translatedName: null });
  const [hexInput, setHexInput] = useState('');
  const [languageInput, setLanguageInput] = useState('');

  // Configurações da API do Microsoft Translator
  const key = 'G6m3TXGl3VNWUXStkO6XqwGsj9vMK3p8ZmkdqnYFGCA8bwN33yYSJQQJ99BIACULyCpXJ3w3AAAbACOGwdd4'; // Substitua pela sua chave do Azure
  const endpoint = 'https://api.cognitive.microsofttranslator.com';
  const location = 'global'; // Substitua pela sua região (ex.: 'global')

  const fetchColorName = async (hex) => {
    try {
      const res = await fetch(`https://www.thecolorapi.com/id?hex=${hex}`);
      const data = await res.json();
      return data.name.value;
    } catch (err) {
      console.error('Erro ao buscar nome da cor:', err);
      return 'Cor Desconhecida';
    }
  };

  const translateColorName = async (colorName, targetLanguage) => {
    try {
      const response = await fetch(
        `${endpoint}/translate?api-version=3.0&from=en&to=${targetLanguage}`,
        {
          method: 'POST',
          headers: {
            'Ocp-Apim-Subscription-Key': key,
            'Ocp-Apim-Subscription-Region': location,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify([{ text: colorName }]),
        }
      );

      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data[0].translations[0].text;
    } catch (err) {

      return colorName; // Retorna o nome original em caso de erro
    }
  };

  const handleHexInput = async (text) => {
    const cleanText = text.replace(/[^0-9A-Fa-f]/g, '').toUpperCase();
    setHexInput(cleanText);

    if (cleanText.length === 3 || cleanText.length === 6) {
      const hexValue = `#${cleanText}`;
      const colorName = await fetchColorName(cleanText);
      const translatedName = languageInput ? await translateColorName(colorName, languageInput) : colorName;
      setSelectedColor({ hex: hexValue, name: colorName, translatedName });
    } else {
      setSelectedColor({ hex: null, name: null, translatedName: null });
    }
  };

  const handleLanguageInput = async (text) => {
    const cleanText = text.replace(/[^a-zA-Z]/g, '').toLowerCase();
    setLanguageInput(cleanText);

    if (selectedColor.name && cleanText) {
      const translatedName = await translateColorName(selectedColor.name, cleanText);
      setSelectedColor({ ...selectedColor, translatedName });
    } else {
      setSelectedColor({ ...selectedColor, translatedName: selectedColor.name });
    }
  };

  const clearSelectedColor = () => {
    setSelectedColor({ hex: null, name: null, translatedName: null });
    setHexInput('');
    setLanguageInput('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cores</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.hexInput}
          placeholder="Digite o código HEX (ex: FF5733)"
          value={hexInput}
          onChangeText={handleHexInput}
          maxLength={6}
          autoCapitalize="characters"
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.hexInput}
          placeholder="Digite a língua (ex: pt, es, fr)"
          value={languageInput}
          onChangeText={handleLanguageInput}
          maxLength={2}
          autoCapitalize="none"
        />
      </View>

      <View style={styles.selectedColorBox}>
        <View
          style={[
            styles.selectedColorSquare,
            selectedColor.hex && { backgroundColor: selectedColor.hex },
          ]}
        >
          {selectedColor.hex ? (
            <>
              <Text style={styles.selectedColorText}>Cor</Text>
              <Text style={styles.selectedColorHex}>{selectedColor.hex}</Text>
            </>
          ) : (
            <Text style={styles.selectedColorText}>Digite ou selecione uma cor</Text>
          )}
        </View>
        {selectedColor.hex && (
          <TouchableOpacity style={styles.clearButton} onPress={clearSelectedColor}>
            <Text style={styles.clearButtonText}>Limpar</Text>
          </TouchableOpacity>
        )}
      </View>
      {selectedColor.hex && (
        <View style={styles.colorNameContainer}>
          <Text style={styles.selectedColorName}>
            Nome Original: {selectedColor.name}
          </Text>
          {selectedColor.translatedName !== selectedColor.name && (
            <Text style={styles.selectedColorName}>
              Nome Traduzido: {selectedColor.translatedName}
            </Text>
          )}
        </View>
      )}
    </View>
  );
}