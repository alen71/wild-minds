import {
  Bitter_300Light,
  Bitter_400Regular,
  Bitter_400Regular_Italic,
  Bitter_500Medium,
  Bitter_500Medium_Italic,
  Bitter_600SemiBold,
  Bitter_700Bold,
  useFonts as useBitterFonts,
} from '@expo-google-fonts/bitter'
import {
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_400Regular_Italic,
  Poppins_500Medium,
  Poppins_500Medium_Italic,
  Poppins_600SemiBold,
  Poppins_700Bold,
  useFonts as usePoppinsFonts,
} from '@expo-google-fonts/poppins'

function useLoadFonts() {
  const [loadPoppinsFonts] = usePoppinsFonts({
    poppinsLight: Poppins_300Light,
    poppinsRegular: Poppins_400Regular,
    poppinsRegularItalic: Poppins_400Regular_Italic,
    poppinsMedium: Poppins_500Medium,
    openSansMediumItalic: Poppins_500Medium_Italic,
    poppinsSemiBold: Poppins_600SemiBold,
    poppinsBold: Poppins_700Bold,
  })

  const [loadedBitterFonts] = useBitterFonts({
    bitterLight: Bitter_300Light,
    bitterRegular: Bitter_400Regular,
    bitterRegularItalic: Bitter_400Regular_Italic,
    bitterMedium: Bitter_500Medium,
    bitterMediumItalic: Bitter_500Medium_Italic,
    bitterSemiBold: Bitter_600SemiBold,
    bitterBold: Bitter_700Bold,
  })

  return loadPoppinsFonts && loadedBitterFonts
}

export default useLoadFonts
