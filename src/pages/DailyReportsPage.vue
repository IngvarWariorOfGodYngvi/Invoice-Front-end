<template>
  <q-page>
    <q-item><div class="text-bold text-center full-width text-h4">Raporty Dzienne</div></q-item>
    <div class="col">
      <q-item dense class="col-6">
              <q-input class="col-6" filled dense v-model="dateOfReport" mask="####-##-##" label="Data Raportu Dziennego">
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
            </q-item>
            <q-item>
            <q-input
              class="col-3"
              input-class="text-right"
              suffix="zł"
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
            <q-btn label="mapa" @click="createReport()"></q-btn>
            </q-item>
              <q-item>
      <q-virtual-scroll v-if="recordsList.length>0" type="table" class="col-3" dense :items="recordsList" >
        <template v-slot:before>
          <thead class="thead-sticky full-width">
            <tr>
              <th class="text-left">Nazwa</th>
              <th class="text-left">Ilość</th>
              <th class="text-left">Cena</th>

            </tr>
          </thead>
        </template>
        <template v-slot="{ item, index }">
            <tr :key="index">
              <!-- record: [], recordsList: [...]  -->
              <td><q-checkbox :val="item.uuid" dense v-model="record.id" :label="item.name" class="col"></q-checkbox></td>
              <td dense class="text-left col"><input type="number" v-model="record.Object.value" step="1" min="0" max="999"/></td>
              <td class="col text-right">{{item.price}} zł</td>
            </tr>
        </template>
      </q-virtual-scroll>
              <q-virtual-scroll type="table" v-if="recordsList1.length>0" class="col-3" dense :items="recordsList1" >
        <template v-slot:before>
          <thead class="thead-sticky full-width">
            <tr>
              <th class="text-left">Nazwa</th>
              <th class="text-left">Ilość</th>
              <th class="text-left">Cena</th>

            </tr>
          </thead>
        </template>
        <template v-slot="{ item, index }">
            <tr :key="index">
              <td><q-checkbox :val="item.uuid" dense v-model="record.id" :label="item.name" class="col"></q-checkbox></td>
              <td dense class="text-left col"><input type="number" value="0" step="1" min="0" max="999"/></td>
              <td class="col text-right">{{item.price}} zł</td>
            </tr>
        </template>
      </q-virtual-scroll>
              <q-virtual-scroll type="table" v-if="recordsList2.length>0" class="col-3" dense :items="recordsList2" >
        <template v-slot:before>
          <thead class="thead-sticky full-width">
            <tr>
              <th class="text-left">Nazwa</th>
              <th class="text-left">Ilość</th>
              <th class="text-left">Cena</th>

            </tr>
          </thead>
        </template>
        <template v-slot="{ item, index }">
            <tr :key="index">
              <td><q-checkbox dense :val="item.uuid" :label="item.name" class="col"></q-checkbox></td>
              <td dense class="text-left col"><input type="number" step="1" min="0" max="999"/></td>
              <td class="col text-right">{{item.price}} zł</td>
            </tr>
        </template>
      </q-virtual-scroll>
              <q-virtual-scroll type="table" v-if="recordsList3.length>0" class="col-3" dense :items="recordsList3" >
        <template v-slot:before>
          <thead class="thead-sticky full-width">
            <tr>
              <th class="text-left">Nazwa</th>
              <th class="text-left">Ilość</th>
              <th class="text-left">Cena</th>

            </tr>
          </thead>
        </template>
        <template v-slot="{ item, index }">
            <tr :key="index">
              <td><q-checkbox dense :val="item.uuid" :label="item.name" class="col"></q-checkbox></td>
              <td dense class="text-left col"><input type="number" step="1" min="0" max="999"/></td>
              <td class="col text-right">{{item.price}} zł</td>
            </tr>
        </template>
      </q-virtual-scroll>
            </q-item>
    </div>
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
  },
  data() {
//  stwórz sobie w data()
//  pole na te dane, będące obiektem, którego kluczami są id Twoich checkboxów, a wartością obiekt: zawartość inputa i status zaznaczenia checkboxa.
//  Podczas wysyłania całego formularza, przejdź po tym obiekcie, wybierz tylko te pola, które są zaznaczone i przerób do struktury jaką potrzebujesz wysłać.
// Ewentualnie zamiast tego obiektu na starcie możesz zrobić tablicę obiektów, z polem na id checkboxa.
    return {
      record: {
        id: [],
        Object: {
          value: "",
          state: false
        }
      },
      recordsList: [],
      recordsList1: [],
      recordsList2: [],
      recordsList3: [],
      dateOfReport: null,
      // record: [],
      name: "",
      price: 0,
      map: {item: [] ,count: []},
      message: "",
      failure: false,
      success: false,
      forbidden: false,
      conflict: false,
      local: App.host,
    };
  },
  methods: {
    getProductsList() {
      fetch("http://" + this.local + "/product/getAll", {
        method: "GET",
      }).then((response) => {
        response.json().then((response) => {
          // wymyślić dynamiczny sposób podziału tablicy na 1, 2, 3 lub 4 części po 15 indekswów w tablicy a jak będzie
          // więcej elementów niż 60 to, żeby wtedy było po 15+1, 15+2... elementów w tablicach
          if(response.length>0) this.recordsList = response.slice(0,14);
          if(response.length>14) this.recordsList1 = response.slice(15,29);
          if(response.length>29) this.recordsList2 = response.slice(30,44);
          if(response.length>44) this.recordsList3 = response.slice(45,response.length);
        });
      });
    },
    addNewProduct(name, price) {
      fetch("http://" + this.local + "/product/addNew?name=" + name + "&price=" + price, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => {
        if (response.status === 400) {
          response.json().then((response) => {
            this.message = response;
            this.failure = true;
            this.autoClose();
          });
        }
        if (response.status === 200) {
          response.json().then((response) => {
            this.message = response;
            this.success = true;
            this.name = "";
            this.price = "";
            this.getProductsList();
            this.autoClose();
          });
        }
      });
    },
    createReport() {
      console.log(map)
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
