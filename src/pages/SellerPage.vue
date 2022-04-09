<template>
  <q-page>
    <div>
      <q-item>
        <div
          class="text-center col full-width no-outline text-h4 text-bold"
          tabindex="0"
        >
          Sprzedawcy
        </div>
      </q-item>
    </div>
    <div class="row q-pa-md">
      <div class="row flex-center text-center">
        <q-item dense class="q-pa-md"
          ><div class="q-pa-md text-bold">DODAJ SPRZEDAWCĘ</div></q-item
        >
        <q-item dense class="q-pa-md"
          ><q-input
            @keypress.enter="createSeller(name, nip)"
            dense
            color="red"
            v-model="name"
            label="Nazwa *"
            onkeypress="return (event.charCode > 64 && event.charCode < 91) || (event.charCode > 96 && event.charCode < 123) || (event.charCode > 210 && event.charCode < 400) || event.charCode == 32"
            filled
        /></q-item>
        <q-item dense class="q-pa-md"
          ><q-input
            @keypress.enter="createSeller(name, nip)"
            dense
            color="red"
            v-model="nip"
            label="NIP *"
            mask="### ### ## ##"
            onkeypress="return (event.charCode > 47 && event.charCode < 58)"
            filled
        /></q-item>
        <q-item dense class="q-pa-md"
          ><q-btn
            color="primary"
            label="dodaj"
            @click="createSeller(name, nip)"
          ></q-btn
        ></q-item>
      </div>
    </div>
    <div class="full-width q-pa-md" style="border: none">
    <q-virtual-scroll
      :virtual-scroll-item-size="48"
      :virtual-scroll-sticky-size-start="48"
      :virtual-scroll-sticky-size-end="32"
      type="table"
      dense
      visible
      :items="sellersList"
    >
      <template v-slot:before>
        <thead class="thead-sticky full-width">
          <tr class="rounded">
            <th class="text-left">lp</th>
            <th class="text-left">nazwa</th>
            <th class="text-left">ID</th>
            <th class="text-left">nip</th>
          </tr>
        </thead>
      </template>
      <template v-slot="{ item, index }">
        <tr
          class="rounded"
          :key="index"
          dense
          style="cursor: pointer"
          @click.ctrl="getOne(item.uuid), (seller = true)"
        >
          <td>{{ index + 1 }}</td>
          <td @click="nameUpdatePopup = true">
            <q-popup-edit dense v-model="nameUpdatePopup">
              <q-input
                v-model="nameUpdate"
                dense
                autofocus
                label="Nowa Nazwa"
                @keypress.enter="updateSeller(item.uuid, nameUpdate, nipUpdate), nameUpdatePopup=false"
              />
              <div class="q-pa-xs">
                <q-btn color="primary" label="Anuluj" v-close-popup></q-btn>
                <q-btn color="primary" label="Zapisz" v-close-popup @click="updateSeller(item.uuid, nameUpdate, nipUpdate)"></q-btn>
              </div> </q-popup-edit
            >{{ item.name }}
          </td>
          <td>{{ item.uuid }}</td>
          <td>
            <q-popup-edit dense v-model="nipUpdatePopup">
              <q-input
                v-model="nipUpdate"
                dense
                autofocus
                label="Nowy NIP"
                mask="### ### ## ##"
                @keypress.enter="updateSeller(item.uuid, nameUpdate, nipUpdate)"
              />
              <div class="q-pa-xs">
                <q-btn color="primary" label="Anuluj" v-close-popup></q-btn>
                <q-btn color="primary" label="Zapisz" v-close-popup @click="updateSeller(item.uuid, nameUpdate, nipUpdate)"></q-btn>
              </div> </q-popup-edit
            >{{ item.nip }}
          </td>
        </tr>
      </template>
    </q-virtual-scroll>
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
    <q-dialog v-model="seller">
      <q-card>
        <q-card-section>
          <div class="text-h6">
            <div>Tutaj będą informacje na temat danego sprzedawcy</div>
            <div>Nazwa: {{ sellerInfo.name }}</div>
            <div>NIP: {{ sellerInfo.nip }}</div>
            <div>ID: {{ sellerInfo.uuid }}</div>
            <div class="fullwidth"><q-virtual-scroll :virtual-scroll-item-size="48"
      :virtual-scroll-sticky-size-start="48"
      :virtual-scroll-sticky-size-end="32" type="table" visible :items="sellerInfo.invoicesList" >
        <template v-slot:before>
          <thead class="thead-sticky full-width">
            <tr>
              <th class="text-left">lp</th>
              <th class="text-left">Nazwa sprzedawcy</th>
              <th class="text-left">numer</th>
              <th class="text-left">data wystawienia</th>
              <th class="text-left">data opłacenia</th>
              <th class="text-left">opis</th>
              <th class="text-left">kwota</th>
            </tr>
          </thead>
        </template>
        <template v-slot="{ item, index }">
            <tr :key="index" dense style="cursor:pointer">
              <td>{{index+1}}</td>
              <td>{{item.sellerName}}</td>
              <td>{{item.number}}</td>
              <td>{{item.dateOfExposed}}</td>
              <td>{{item.dateOfPayment}}</td>
              <td>{{item.description}}</td>
              <td>{{item.amount}} zł</td>
            </tr>
        </template>
      </q-virtual-scroll></div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>
<style src="src\style\style.scss" lang="scss">
</style>

<script>
import { defineComponent } from "vue";
import App from "src/App.vue";
export default defineComponent({
  name: "SellerPage",

  created() {
    this.getSellers();
  },
  data() {
    return {
      sellersList: [],
      nip: "",
      name: "",
      message: "",
      seller: false,
      sellerInfo: "",
      nameUpdate: "",
      nameUpdatePopup: false,
      nipUpdate: false,
      nipUpdatePopup: false,
      failure: false,
      success: false,
      forbidden: false,
      conflict: false,
      local: App.host,
    };
  },
  methods: {
    showloading() {
      this.$q.loading.show({ message: "Dzieje się coś ważnego... Poczekaj" });
      this.timer = setTimeout(() => {
        this.$q.loading.hide();
        this.timer = 0;
      }, 1000);
    },
    getSellers() {
      fetch("http://" + this.local + "/seller/getAll", {
        method: "GET",
      }).then((response) => {
        response.json().then((response) => {
          this.sellersList = response;
        });
      });
    },
    getOne(uuid) {
      fetch(
        "http://" + this.local + "/seller/getSellerById?sellerUUID=" + uuid,
        {
          method: "GET",
        }
      ).then((response) => {
        if (response.status === 400) {
          response.json().then((response) => {
            this.message = response;
            this.failure = true;
            this.autoClose();
          });
        }
        if (response.status === 200) {
          response.json().then((response) => {
            this.sellerInfo = response;
            this.autoClose();
          });
        }
      });
    },
    createSeller(name, nip) {
      const data = {
        name: name,
        NIP: nip,
      };
      fetch("http://" + this.local + "/seller/create", {
        method: "POST",
        body: JSON.stringify(data),
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
            this.nip = "";
            this.getSellers();
            this.autoClose();
          });
        }
      });
    },
    updateSeller(uuid, name, nip) {
      const data = {
        name: name,
        NIP: nip,
      };
      fetch("http://" + this.local + "/seller/update?sellerUUID=" + uuid, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => {
        if (response.status === 400) {
          response.json().then((response) => {
            this.message = response;
            this.nameUpdate = "";
            this.nipUpdate = "";
            this.failure = true;
            this.autoClose();
          });
        }
        if (response.status === 200) {
          response.json().then((response) => {
            this.message = response;
            this.success = true;
            this.nameUpdate = "";
            this.nipUpdate = "";
            this.getSellers();
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
  },
});
</script>
