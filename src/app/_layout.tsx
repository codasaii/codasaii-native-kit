import { Uniwind } from "uniwind";
import "../global.css";

import { Slot } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Layout() {
	Uniwind.setTheme("light");

	return (
		<GestureHandlerRootView>
			<Slot />
		</GestureHandlerRootView>
	);
}
