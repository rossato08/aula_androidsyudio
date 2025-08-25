import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  colorGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  colorColumn: {
    flex: 1,
    marginHorizontal: 10,
  },
  colorBox: {
    alignItems: 'center',
    marginVertical: 10,
  },
  colorPreview: {
    width: 80,
    height: 80,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 8,
  },
  hexText: {
    fontSize: 11,
    color: '#555',
  },
  selectedColorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  selectedColorSquare: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  selectedColorText: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  clearButton: {
    backgroundColor: '#e02424',
    padding: 10,
    borderRadius: 8,
  },
  clearButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});