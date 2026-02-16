import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  // Container
  container: {
    width: '100%',
  },

  // Picker Field
  textField: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    minHeight: 50,
  },
  selectedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  selectedFlag: {
    width: 24,
    height: 16,
    marginRight: 10,
    borderRadius: 2,
    borderWidth: 0.5,
  },
  selectedText: {
    fontSize: 16,
  },
  callingCodeText: {
    fontWeight: '600',
    fontSize: 16,
  },
  placeholderText: {
    fontSize: 16,
  },
  dropdownIcon: {
    marginLeft: 8,
  },


  // Modal
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  overlayTouchable: {
    flex: 1,
  },
  bottomSheet: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  fullScreenContainer: {
    flex: 1,
  },
  fullScreenContent: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },

  // List
  list: {
    flex: 1,
  },
  listContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
  },
});
