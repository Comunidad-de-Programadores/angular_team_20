import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FirestoreService } from 'src/app/core/services/firebase.service';
import { ElementId } from 'src/app/shared/models/element';

@Component({
  selector: 'app-profileventos',
  templateUrl: './profileventos.component.html',
  styleUrls: ['./profileventos.component.css']
})

export class ProfileventosComponent implements OnInit, OnChanges {
  talleres: ElementId[] = [];
  currentUser: ElementId = {} as ElementId;
  errormsg = "";
  @Input() user: ElementId = {} as ElementId;
  @Input() item: ElementId = {} as ElementId;
  @Input() area: string = "";
  @Output() addItem: EventEmitter<ElementId> = new EventEmitter<ElementId>();
  @Output() editItem: EventEmitter<ElementId> = new EventEmitter<ElementId>();
  @Output() uploadImage: EventEmitter<ElementId> = new EventEmitter<ElementId>();
  @Output() removeImage: EventEmitter<ElementId> = new EventEmitter<ElementId>();
  constructor(private fsService: FirestoreService) {
    this.fsService.getCollection('talleres').subscribe((data) => {
      this.talleres = data as ElementId [];
      console.log("TALLERES: "+JSON.stringify(this.talleres))
    });
   }
  ngOnChanges(changes: SimpleChanges): void {
    this.currentUser = this.user;
  }
  ngOnInit(): void {
    this.currentUser = this.user;
  }
  AddEvent(event: ElementId){
    this.currentUser.talleres = this.currentUser.talleres ? this.currentUser.talleres : [];
    this.currentUser.url = `users/${this.currentUser.uid}`;
        
    var newEvent:ElementId = {
    uid : event.id!,
    title : event.title,
    description : event.description,
    url: `talleres/${event.id}`
    };

    const index = this.currentUser.talleres!.findIndex(ev=>ev.uid === event.id);
    if(index === -1){
      this.currentUser.talleres?.push(newEvent);
      this.addItem.emit(this.currentUser);
    }
    else
    {
      this.errormsg = "Ya tienes agregado este evento en tu lista.";
    }
  }
  DeleteEvent(event: ElementId){
    this.currentUser.talleres?.splice(this.currentUser.talleres!.findIndex(ev=>ev.uid === event.id),1);
    this.addItem.emit(this.currentUser);
  }
  EditEvent(event: ElementId){
    event.url = `talleres/${event.id}`;
    this.editItem.emit(event);
  }
  insertImage(event: ElementId){
    event.url = `talleres/${event.id}`;
    this.uploadImage.emit(event);
  }
  deleteImage(event: ElementId, image: ElementId){
    //event.url = `comunidades/${event.id}`;
    event.item = image;
    this.removeImage.emit(event);
  }
}
