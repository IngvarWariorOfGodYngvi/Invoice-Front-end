<template>
  <q-page>
    <q-item><div class="text-bold text-center full-width text-h4">Raporty Dzienne</div></q-item>
    <q-item><div class="text-bold text-left full-width">Dodaj produkt</div></q-item>
    <div class="col">
          <q-item>
            <q-input
              class="col-3"
              input-class="text-right"
              filled
              dense
              v-model="name"
              label="nazwa"
            ></q-input>
            <q-input
              class="col-3"
              input-class="text-right"
              suffix="zł"
              filled
              dense
              v-model="price"
              label="Kwota"
            ></q-input>
            <q-btn label="dodaj produkt" @click="addNewProduct(name,price)"></q-btn>
            <!-- <q-btn label="mapa" @click="createReport()"></q-btn> -->
            </q-item>
            <q-item class="full-width">
              <div class="col">
    <q-expansion-item class="bg-grey-3 text-bold" default-opened label-lines="dotted" dense label="Dodawanie raportu">
      <q-item class="bg-white row q-pl-none">
              <q-input class="col-3" filled dense v-model="dateOfReport" mask="####-##-##" label="Data Raportu Dziennego">
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      ref="qDateProxy"
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date v-model="dateOfReport">
                        <div class="row items-center justify-end">
                          <q-btn
                            v-close-popup
                            label="Zamknij"
                            color="primary"
                            flat
                          />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            <q-item dense>
              <q-btn label="dodaj raport" @click="sendReport(recordsList, dateOfReport)"></q-btn>
            </q-item>
            </q-item>
    <div class="q-pt-md row bg-white">
      <q-virtual-scroll v-if="recordsList.length>0" :virtual-scroll-slice-ratio-before="20" type="table" class="col-4" dense :items="recordsList.slice(0,20)" >
        <template v-slot:before>
          <thead class="thead-sticky full-width">
            <tr>
              <th class="text-left">Nazwa</th>
              <th class="text-left">Ilość</th>
              <th class="text-left">Cena</th>
              <th class="text-left">Suma</th>
            </tr>
          </thead>
        </template>
        <template v-slot="{ item, index }">
            <tr :key="index">
              <td>{{index+1}}. {{item.name}}</td>
              <td dense class="text-left">
                <input dense standout="bg-grey-3 text-black" type="number" min="0" step="1" max="999" v-model="item.quantity" @input="onEnter(item,item.quantity)"/>
              </td>
              <td class="text-right"><q-btn dense class="full-width q-pa-none">{{viewCurrency (item.price)}}<q-tooltip class="text-body1" anchor="top middle" :offset="[0,30]">zmień cenę</q-tooltip></q-btn><q-popup-edit v-model="editPrice"><input v-model="newPrice" type="number" min="0" max="999" step="0.1"/><q-btn @click="changeProductPrice(item.uuid,newPrice)" dense label="zapisz" v-close-popup></q-btn></q-popup-edit></td>
              <td class="text-right">{{viewCurrency (item.price * item.quantity)}}</td>
            </tr>
        </template>
      </q-virtual-scroll>
      <q-virtual-scroll v-if="recordsList.length>20" :virtual-scroll-slice-ratio-before="20" type="table" class="col-4" dense :items="recordsList.slice(20,40)" >
        <template v-slot:before>
          <thead class="thead-sticky full-width">
            <tr>
              <th class="text-left">Nazwa</th>
              <th class="text-left">Ilość</th>
              <th class="text-left col-1">Cena</th>
              <th class="text-left col-4">Suma</th>
            </tr>
          </thead>
        </template>
        <template v-slot="{ item, index }">
            <tr :key="index">
              <td>{{index+21}}. {{item.name}}</td>
              <td dense class="text-left">
                <input dense standout="bg-grey-3 text-black" type="number" min="0" step="1" max="999" v-model="item.quantity" @input="onEnter(item,item.quantity)"/>
              </td>
              <td class="text-right"><q-btn dense class="full-width q-pa-none">{{viewCurrency (item.price)}}<q-tooltip class="text-body1" anchor="top middle" :offset="[0,30]">zmień cenę</q-tooltip></q-btn><q-popup-edit v-model="editPrice"><input v-model="newPrice" type="number" min="0" max="999" step="0.1"/><q-btn @click="changeProductPrice(item.uuid,newPrice)" dense label="zapisz" v-close-popup></q-btn></q-popup-edit></td>
              <td class="text-right">{{viewCurrency (item.price * item.quantity)}}</td>
            </tr>
        </template>
      </q-virtual-scroll>
      <q-virtual-scroll v-if="recordsList.length>40" :virtual-scroll-slice-ratio-before="20" type="table" class="col-4" dense :items="recordsList.slice(40,recordsList.lenght)" >
        <template v-slot:before>
          <thead class="thead-sticky full-width">
            <tr>
              <th class="text-left">Nazwa</th>
              <th class="text-left">Ilość</th>
              <th class="text-left">Cena</th>
              <th class="text-left">Suma</th>
            </tr>
          </thead>
        </template>
        <template v-slot="{ item, index }">
            <tr :key="index">
              <td>{{index+41}}. {{item.name}}</td>
              <td dense class="text-left">
                <input dense standout="bg-grey-3 text-black" type="number" min="0" step="1" max="999" v-model="item.quantity" @input="onEnter(item,item.quantity)"/>
              </td>
              <td class="text-right"><q-btn dense class="full-width q-pa-none">{{viewCurrency (item.price)}}<q-tooltip class="text-body1" anchor="top middle" :offset="[0,30]">zmień cenę</q-tooltip></q-btn><q-popup-edit v-model="editPrice"><input v-model="newPrice" type="number" min="0" max="999" step="0.1"/><q-btn @click="changeProductPrice(item.uuid,newPrice)" dense label="zapisz" v-close-popup></q-btn></q-popup-edit></td>
              <td class="text-right">{{viewCurrency (item.price * item.quantity)}}</td>
            </tr>
        </template>
      </q-virtual-scroll>
    </div>
    </q-expansion-item>
    <q-expansion-item class="bg-grey-3 text-bold q-mt-md" label-lines="dotted" dense label="Raporty dzienne">
      <q-item class="q-pl-none bg-white">
        <q-item class="col-4 q-pl-none" dense><q-select v-model="year" :options="years" dense filled use-input hide-selected fill-input input-debounce="0" stack-label label="Wybierz rok" class="col"></q-select></q-item>
        <q-select v-model="month" :options="months"  dense filled use-input hide-selected fill-input input-debounce="0" label="Wybierz miesiąc" class="col-3">
          <template v-slot:option="scope">
          <q-item class="q-pa-none" dense v-bind="scope.itemProps.dense = true">
            <q-item v-bind="scope.itemProps" class="full-width">{{scope.opt}}</q-item>
          </q-item>
        </template>
        </q-select>
        <q-item dense>
          <q-btn @click="getDailyReportsWithDate(month)" label="wybierz"></q-btn>
        </q-item>
      </q-item>
      <q-virtual-scroll type="table" class="col-4" dense :items="dailyReportList" >
        <template v-slot:before>
          <thead class="thead-sticky full-width">
            <tr>
              <th class="text-left">ID</th>
              <th class="text-left">data</th>
              <th class="text-left">suma</th>
            </tr>
          </thead>
        </template>
        <template v-slot="{ item, index }">
            <tr @click="open=true, items = item" :key="index">
              <td>{{index+1}}. {{item.uuid}} <q-btn label="wyświetl listę pozycji"></q-btn></td>
              <td dense class="text-left">{{item.date}}</td>
              <td class="text-right">{{viewCurrency(item.sum)}}</td>
            </tr>
        </template>
      </q-virtual-scroll>
      </q-expansion-item>
      </div>
    </q-item>
    </div>
    <q-dialog v-model="open">
      <q-card class="full-width text-center ">
        <q-card-section class="full-width text-center" >
          <div class="full-width text-center text-h6">Lista Pozycji</div>
        </q-card-section>

        <q-card-section>
      <q-virtual-scroll :items="items.productList" type="table" dense class="text-center">
          <template v-slot:before>
            <thead class="thead-sticky">
              <tr class="row">
                <th class="text-left col-1">lp</th>
                <th class="text-left col">nazwa</th>
                <th class="text-left col-2">ilość</th>
                <th class="text-left col-2">cena</th>
                <th class="text-left col-2">suma</th>
              </tr>
            </thead>
          </template>
          <template v-slot="{ item, index }">
              <tr class="row">
                <td class="text-left col-1">{{index+1}}</td>
                <td class="text-left col">{{item.name}}</td>
                <td class="text-left col-2">{{item.quantity}}</td>
                <td class="text-left col-2">{{viewCurrency (item.price)}}</td>
                <td class="text-left col-2">{{viewCurrency (item.sum)}}</td>
              </tr>
          </template>
        </q-virtual-scroll>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
      </q-dialog>
       <q-dialog :position="'top'" v-model="success">
      <q-card>
        <q-card-section>
          <div class="text-h6 text-center">{{ message }}</div>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog :position="'top'" v-model="failure">
      <q-card>
        <q-card-section>
          <div class="text-h6 text-center">{{ message }}</div>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog :position="'top'" v-model="forbidden">
      <q-card class="bg-warning">
        <q-card-section>
          <div class="text-h6">Niewłaściwy kod. Spróbuj ponownie.</div>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog :position="'top'" v-model="conflict">
      <q-card class="bg-warning">
        <q-card-section>
          <div class="text-h6">
            Wystąpił konflikt. Nie można wykonać żądania.
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import App from 'src/App.vue'

export default defineComponent({
  name: 'DailyReportsPage',
  created() {
    this.getProductsList();
    this.getAllDailyReports();
  },
  data() {
    return {
      sum1: 0,
      sum2: 0,
      sum3: 0,
      month: null,
      months: ["styczeń", "luty", "marzec", "kwiecień", "maj", "czerwiec","lipiec", "sierpień", "wrzesień", "październik", "listopad", "grudzień"],
      year:new Date().getFullYear(),
      years: [ "2021", "2022", "2023" ],
      dailyReportList: [],
      editPrice: false,
      newPrice: "0",
      open: false,
      items: null,
      quantity: "",
      itemUUID: "",
      itemsPrice:[],
      recordsList: [],
      recordsList1: [],
      recordsList2: [],
      recordsList3: [],
      dateOfReport: null,
      name: "",
      price: 0,
      message: "",
      failure: false,
      success: false,
      forbidden: false,
      conflict: false,
      local: App.host,
    };
  },
  methods: {
    onEnter(item, quantity) {
      let fe = this.recordsList.find(function e(element) {
            return element.uuid === item.uuid;
          })
      fe.quantity = quantity
      let fi = this.recordsList.findIndex(function e(element) {
            return element.uuid === item.uuid;
          })
      this.recordsList[fi] = fe
      this.quantity = ""
    },
    viewCurrency (money) {
      if (money === undefined) { money = '0'}
      var formatterPL = new Intl.NumberFormat('pl-PL',{style: 'currency', currency: 'PLN'})
      var cash = formatterPL.format(money)
      return cash
    },
    getProductsList() {
      fetch("http://" + this.local + "/product/getAll", {
        method: "GET",
      }).then((response) => {
        response.json().then((response) => {
          let temp = []
          this.recordsList = []
          if (response.length>0) { temp = response.slice(0,response.length)
          for (let i = 0; i<temp.length ;i++ ) {
            this.recordsList.push(new Object({uuid: temp[i].uuid,quantity:'0', price: temp[i].price, name: temp[i].name}))
          }
          this.recordsList.sort()
          }
        })
      });
    },
    getAllDailyReports() {
      fetch("http://" + this.local + "/dailyReport/getAll", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => {
        if (response.status === 400) {
          response.text().then((response) => {
            this.message = response;
            this.failure = true;
            this.autoClose();
          });
        }
        if (response.status === 200) {
          response.json().then((response) => {
            this.dailyReportList = response
          });
        }
      });
    },
    getDailyReportsWithDate(month) {
      fetch("http://" + this.local + "/dailyReport/getAll?month=" + month, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => {
        if (response.status === 400) {
          response.text().then((response) => {
            this.message = response;
            this.failure = true;
            this.autoClose();
          });
        }
        if (response.status === 200) {
          response.json().then((response) => {
            this.dailyReportList = response
          });
        }
      });
    },
    addNewProduct(name, price) {
      fetch("http://" + this.local + "/product/addNew?name=" + name + "&price=" + price.replace(/\,/gi,'.'), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => {
        if (response.status === 400) {
          response.text().then((response) => {
            this.message = response;
            this.failure = true;
            this.autoClose();
          });
        }
        if (response.status === 200) {
          response.text().then((response) => {
            this.message = response;
            this.success = true;
            this.getProductsList()
            this.autoClose();
          });
        }
      });
    },
    changeProductPrice (id, newPrice) {
      fetch("http://" + this.local + "/product/editPrice?uuid=" + id + "&newPrice=" + newPrice, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => {
        if (response.status === 400) {
          response.text().then((response) => {
            this.message = response;
            this.failure = true;
            this.autoClose();
          });
        }
        if (response.status === 200) {
          response.text().then((response) => {
            this.message = response;
            this.success = true;
            this.getProductsList()
            this.autoClose();
          });
        }
      });
    },
    sendReport(list, date) {
      var data = list
      fetch("http://" + this.local + "/dailyReport/addDailyReport?date="+ date, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((response) => {
        if (response.status === 400) {
          response.text().then((response) => {
            this.message = response;
            this.failure = true;
            this.autoClose();
          });
        }
        if (response.status === 200) {
          response.text().then((response) => {
            this.message = response;
            this.success = true;
            this.getAllDailyReports()
            this.autoClose();
          });
        }
      });
    },
    autoClose() {
      setTimeout(() => {
        this.failure = false;
        this.success = false;
        this.forbidden = false;
        this.conflict = false;
        this.message = null;
      }, 2000);
    },
  }
})
</script>
