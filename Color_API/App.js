import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import styles from './styles';

export default function App() {
  const [colors, setColors] = useState([]);
  const [selectedColor, setSelectedColor] = useState(null);

  const fetchColors = async () => {
    try {
      // Lista de valores hex iniciais para garantir variedade
      const hexValues = ['24B1E0', 'FF5733', '33FF57'];
      let allColors = [];

      // Faz chamadas à API para cada valor hex
      for (const hex of hexValues) {
        const res = await fetch(
          `https://www.thecolorapi.com/scheme?hex=${hex}&mode=analogic&count=4`
        );
        const data = await res.json();
        allColors = [...allColors, ...data.colors];
      }

      // Remove cores duplicadas com base no valor hex
      const uniqueColors = [...new Map(allColors.map(item => [item.hex.value, item])).values()];
      
      // Limita a 12 cores únicas
      setColors(uniqueColors.slice(0, 12));
      setSelectedColor(null);
    } catch (err) {
      console.error('Erro ao buscar cores:', err);
    }
  };

  useEffect(() => {
    fetchColors();
  }, []);

  const clearSelectedColor = () => {
    setSelectedColor(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cores</Text>

      <View style={styles.colorGrid}>
        <FlatList
          data={colors.slice(0, 6)}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.colorBox}
              onPress={() => setSelectedColor(item.name.value)}
            >
              <View
                style={[styles.colorPreview, { backgroundColor: item.hex.value }]}
              />
              <Text style={styles.hexText}>{item.hex.value}</Text>
            </TouchableOpacity>
          )}
          style={styles.colorColumn}
        />
        <FlatList
          data={colors.slice(6, 12)}
          keyExtractor={(item, index) => (index + 6).toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.colorBox}
              onPress={() => setSelectedColor(item.name.value)}
            >
              <View
                style={[styles.colorPreview, { backgroundColor: item.hex.value }]}
              />
              <Text style={styles.hexText}>{item.hex.value}</Text>
            </TouchableOpacity>
          )}
          style={styles.colorColumn}
        />
      </View>

      <View style={styles.selectedColorBox}>
        <View style={styles.selectedColorSquare}>
          <Text style={styles.selectedColorText}>
            {selectedColor || 'Selecione uma cor'}
          </Text>
        </View>
        {selectedColor && (
          <TouchableOpacity
            style={styles.clearButton}
            onPress={clearSelectedColor}
          >
            <Text style={styles.clearButtonText}>Limpar</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}