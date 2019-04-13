import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import firebase from 'firebase';
import { Livro } from '../../model/livro';
/**
 * Generated class for the ListaLivroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lista-livro',
  templateUrl: 'lista-livro.html',
})
export class ListaLivroPage {

  listaDeLivros : Livro[] = [];//<--

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public menu : MenuController ) {
  }
  

  getList() {

    var ref = firebase.firestore().collection("livro");
    ref.get().then(query => {
        query.forEach(doc => {
            let c = new Livro();
            c.setDados(doc.data());
            c.id = doc.id;
            this.listaDeLivros.push(c);
        });
    });

  }
  

  ionViewDidLoad() {
    this.menu.enable(true);
    //this.listaDelivro = this.clienteServ.getList();
    this.getList();

  }

 
  

  novoLivro(){
    this.navCtrl.push('NovoLivroPage')
  }

  remove(obj : Livro){
    var ref = firebase.firestore().collection("livro");
    ref.doc(obj.id).delete()
      .then(()=>{
        this.listaDeLivros = [];
        this.getList();
      }).catch(()=>{
        console.log('Erro ao atualizar');
      })

  }
  atualiza(obj : Livro){
    this.navCtrl.push('LivroVisualizaPage', {'livro': obj})

  }
}
