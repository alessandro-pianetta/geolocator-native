import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    zIndex: 10,
    overflow: 'visible',
    flexGrow: 0,
    flexShrink: 0,
  },
  textInputContainer: {
    borderTopWidth: 0,
    borderBottomWidth: 0,
    height: 50,
    overflow: 'visible',
    backgroundColor: 'white',
    borderColor: 'white',
    borderRadius: 100,
  },
  textInput: {
    backgroundColor: 'transparent',
    fontSize: 15,
    lineHeight: 22.5,
    paddingBottom: 0,
    flex: 1
  },
  listView: {
    width: '100%',
    position: 'absolute',
    top: 50,
    // left: 10,
    // right: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    flex: 1,
    elevation: 3,
    zIndex: 10
  },
  description: {
    color: '#1faadb'
  },
  predefinedPlacesDescription: {
    color: '#1faadb'
  }
})

export default styles;