
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { MatPaginatorModule } from '@angular/material/paginator';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {ReactiveFormsModule} from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { ToolBarComponent } from './tool-bar/tool-bar.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatExpansionModule} from '@angular/material/expansion';
import { TaskDialogComponent } from './task-dialog/task-dialog.component';
import { MatNativeDateModule } from '@angular/material/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTableModule} from '@angular/material/table';
import { environment } from 'src/environments/environment.development';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { TaskTableComponent } from './task-table/task-table.component';
import { MatSelectModule } from '@angular/material/select';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { DatePipe } from '@angular/common';
import { MessageDialogComponent } from './message-dialog/message-dialog.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ToolBarComponent,
    TaskDialogComponent,
    TaskTableComponent,
    MessageDialogComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    MatPaginatorModule,
    MatSelectModule,
    AngularFireStorageModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    BrowserModule,
    MatCheckboxModule,
    AppRoutingModule,
    MatGridListModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatTableModule,
    ReactiveFormsModule,
    MatCardModule,
    MatIconModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatDatepickerModule,
    MatButtonModule,
    MatProgressBarModule,
    MatToolbarModule,
    DragDropModule,
    MatDividerModule,
    MatDialogModule,
    ScrollingModule,
    MatExpansionModule,MatNativeDateModule
    
  ],
  providers: [MatDatepickerModule,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule {


 }
