import { StartDetailComponent } from './../../shared/start-detail/start-detail.component';
import { ChatBoxComponent } from './chat-box/chat-box.component';

export const MESSAGE_ROUTES = [
	{ path: '', component: StartDetailComponent },
	{ path: ':id', component: ChatBoxComponent }
]