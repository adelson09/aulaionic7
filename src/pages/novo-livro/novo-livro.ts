import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FormBuilder, FormGroup } from '@angular/forms';
import firebase from 'firebase';
/**
 * Generated class for the NovoLivroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-novo-livro',
  templateUrl: 'novo-livro.html',
})
export class NovoLivroPage {
 
  formGroup : FormGroup;
  
  firestore = firebase.firestore();
  settings = {timestampsInSnapshots: true};
 
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder : FormBuilder) {

      this.firestore.settings(this.settings); 

      this.formGroup = this.formBuilder.group({
        titulo : [''],
        autor : [],
        preco : [''],
        resumo : ['']
      })
  }



  cadastrar(){
    let ref = this.firestore.collection('livro')
    ref.add(this.formGroup.value)
      .then(() =>{
        console.log('Cadastrado com sucesso');
        this.navCtrl.setRoot('ListaLivroPage');
      }).catch(()=>{
        console.log('Erro ao cadastrar');
      })
      
  }
}


