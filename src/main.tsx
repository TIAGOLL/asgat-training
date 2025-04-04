import "./assets/global.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.tsx";

// https://docs.google.com/document/d/1qyOq_Q_eiWSgfoM0jx7XYUOgbWP25RLQYXy-R_HcRTc/edit?tab=t.0
// https://miro.com/welcomeonboard/WmpvemMweXlwMXdwVU4rVTVzdUplUUNyeFRzQWhkRVVNSmROSlJxOENOZGhDNDdGUEVod0Y2d0tDYlJLVzZnZ2V0OWtxSmRtQmdJaFhpZjJtSER3R3FTM1BmcWwraHRlR2RIb0FEcnVNNjh3cnMyNEM4Y1paa09NVjlXNE55amxBd044SHFHaVlWYWk0d3NxeHNmeG9BPT0hdjE=?share_link_id=617846056015

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<div className='h-auto w-auto'>
			<App />
		</div>
	</StrictMode>
);
