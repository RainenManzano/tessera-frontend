import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from './../../angular.material';
import { RouterModule } from '@angular/router';

import {NgbPopoverModule} from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from './../../shared/shared.module';

import { MessageComponent } from './message.component';
import { MessageSearchComponent } from './message-search/message-search.component';
import { ConversationListComponent } from './conversation-list/conversation-list.component';
import { MessageHeaderComponent } from './chat-box/message-header/message-header.component';
import { MessageListComponent } from './chat-box/message-list/message-list.component';
import { MessageChatComponent } from './chat-box/message-chat/message-chat.component';

import { ChatBoxComponent } from './chat-box/chat-box.component';

@NgModule({
	declarations: [
		MessageComponent,
		MessageSearchComponent,
		ConversationListComponent,
		MessageHeaderComponent,
		MessageListComponent,
		MessageChatComponent,
		ChatBoxComponent
	],
	imports: [
		CommonModule,
		RouterModule,
		AngularMaterialModule,
		NgbPopoverModule,
		SharedModule
	]
})

export class MessageModule {
	
}