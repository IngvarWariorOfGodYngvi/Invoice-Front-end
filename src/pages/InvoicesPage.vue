<template>
  <q-page>
    <div>
      <q-item>
        <div
          class="text-center col full-width no-outline text-h4 text-bold"
          tabindex="0"
        >
          Faktury
        </div>
      </q-item>
    </div>
    <div class="row">
      <div class="col-4">
        <div class="row">
        <div class="col-8">
      <q-item dense class="items-center">
        <div class="text-bold">DODAJ SPRZEDAWCĘ</div>
      </q-item>
      <q-item dense class="items-center"
        ><q-input
          @keypress.enter="createSeller(name, nip)"
          dense
          color="primary"
          v-model="name"
          label="Nazwa *"
          onkeypress="return (event.charCode > 64 && event.charCode < 91) || (event.charCode > 96 && event.charCode < 123) || (event.charCode > 210 && event.charCode < 400) || event.charCode == 32"
          filled
          class="full-width"
      /></q-item>
      <q-item dense class="items-center"
        ><q-input
          @keypress.enter="createSeller(name, nip)"
          dense
          color="primary"
          v-model="nip"
          label="NIP"
          mask="### ### ## ##"
          onkeypress="return (event.charCode > 47 && event.charCode < 58)"
          filled
          class="full-width"
      /></q-item>
    </div>
    <div class="col full-heigth">
      <q-item dense class="fit row reverse-wrap justify-start items-start q-pr-md"
        ><q-btn
          color="primary"
          label="dodaj"
          class="full-width"
          @click="createSeller(name, nip)"
        ></q-btn
      ></q-item>
    </div>
    </div>
    <q-item dense><div class="text-bold">DODAJ FAKTURĘ</div></q-item>
        <div class="row full-width">
          <div class="row full-width flex-center text-center">
            <q-item dense class="col">
              <q-select
                class="full-width"
                dense
                filled
                v-model="sellerName"
                color="primary"
                use-input
                hide-selected
                fill-input
                input-debounce="0"
                :options="options"
                @filter="filterNames"
                label="Nazwa Sprzedawcy"
              >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      Brak wyników
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </q-item>
            <div class="col-2 text-bold">lub</div>
            <q-item dense class="col">
              <q-select
                class="full-width"
                dense
                filled
                v-model="sellerNip"
                mask="### ### ## ##"
                color="primary"
                use-input
                hide-selected
                fill-input
                input-debounce="0"
                :options="options"
                @filter="filterNip"
                label="NIP Sprzedawcy"
              >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      Brak wyników
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </q-item>
          </div>
        </div>
        <div class="row full-width">
          <div class="row full-width flex-center text-center">
            <q-item dense class="col">
              <q-input
                class="full-width"
                filled
                dense
                v-model="dateOfExposed"
                mask="####-##-##"
                label="Data wystawienia faktury"
              >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      ref="qDateProxy"
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date v-model="dateOfExposed">
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
            <div class="col-2 text-bold">i/lub</div>
            <q-item dense class="col">
              <q-input
                class="full-width"
                filled
                dense
                v-model="dateOfPayment"
                mask="####-##-##"
                label="Data opłacenia faktury"
              >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      ref="qDateProxy"
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date v-model="dateOfPayment">
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
          </div>
        </div>
        <div>
          <q-item dense class="row items-center rounded">
            <div v-if="!transfer_cash" class="q-pa-xs bg-primary text-center">
              PRZELEW
            </div>
            <div v-if="transfer_cash" class="q-pa-xs text-grey-4 text-center">
              PRZELEW
            </div>
            <q-toggle color="primary" keep-color v-model="transfer_cash">
            </q-toggle>
            <div v-if="transfer_cash" class="q-pa-xs row bg-primary">
              GOTÓWKA
            </div>
            <div v-if="!transfer_cash" class="q-pa-xs row text-grey-4">
              GOTÓWKA
            </div>
          </q-item>
          <q-item dense class="row items-center rounded">
            <div v-if="!bill_invoice" class="q-pa-xs bg-primary text-center">
              PARAGON
            </div>
            <div v-if="bill_invoice" class="q-pa-xs text-grey-4 text-center">
              PARAGON
            </div>
            <q-toggle color="primary" keep-color v-model="bill_invoice">
            </q-toggle>
            <div v-if="bill_invoice" class="q-pa-xs row bg-primary">
              FAKTURA
            </div>
            <div v-if="!bill_invoice" class="q-pa-xs row text-grey-4">
              FAKTURA
            </div>
          </q-item>
          <q-item dense>
            <q-input
              class="col"
              v-if="bill_invoice"
              filled
              dense
              v-model="invoiceNumber"
              label="Numer Faktury"
            ></q-input>
            <q-input
              class="col"
              v-else
              filled
              dense
              v-model="invoiceNumber"
              label="Numer Paragonu"
            ></q-input>
            <div class="q-pr-md q-pl-md"></div>
            <q-input
              class="col-3"
              input-class="text-right"
              suffix="zł"
              filled
              dense
              v-model="amount"
              label="Kwota"
              onkeypress="return (event.charCode > 47 && event.charCode < 58 || event.charCode === 44 || event.charCode === 46)"
            ></q-input>
          </q-item>
          <q-item dense>
            <q-input
              class="full-width"
              filled
              dense
              v-model="description"
              label="Opis"
            ></q-input>
          </q-item>
          <q-item dense>
            <q-select
              class="full-width"
              dense
              filled
              v-model="categoryName"
              color="primary"
              use-input
              hide-selected
              fill-input
              input-debounce="0"
              :options="optionsCategories"
              @filter="filterCategory"
              label="Kategoria"
              @new-value="createValue"
            >
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    <div class="text-grey">Brak wyników</div>
                    <div class="text-red">Aby dodać taką kategorię naciśnij enter a potem wybierz z listy</div>
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
          </q-item>
          <q-item class="row reverse full-width" dense>
            <q-btn color="primary" label="zapisz fakturę" @click="createInvoice(sellerName,sellerNip)"></q-btn>
          </q-item>
        </div>
      </div>
      <div class="col">
        <div class="text-center text-bold q-pa-xs">Faktury opłacone Gotówką w tym miesiącu</div>
      <q-virtual-scroll :virtual-scroll-item-size="48"
      :virtual-scroll-sticky-size-start="48"
      :virtual-scroll-sticky-size-end="32" type="table" dense visible :items="invoicesCash" >
        <template v-slot:before>
          <thead class="thead-sticky full-width">
            <tr>
              <th class="text-left">lp</th>
              <th class="text-left"><div>Nazwa</div><div>Sprzedawcy</div></th>
              <th class="text-left">numer</th>
              <th class="text-left"><div>data</div><div>wystawienia</div></th>
              <th class="text-left"><div>data</div><div>opłacenia</div></th>
              <th class="text-left">opis</th>
              <th class="text-left">kwota</th>
              <th class="text-left">kategoria</th>
            </tr>
          </thead>
        </template>
        <template v-slot:after>
        <tfoot class="tfoot-sticky text-left">
            <tr>
              <th class="text-left"></th>
              <th class="text-left"></th>
              <th class="text-left"></th>
              <th class="text-left"></th>
              <th class="text-left"></th>
              <th class="text-left"></th>
              <th class="text-left">{{amountSumCash}} zł</th>
              <th class="text-left"></th>
            </tr>
        </tfoot>
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
              <td>{{item.categoryName}}</td>
            </tr>
        </template>
      </q-virtual-scroll>
        <div class="text-center text-bold q-pa-xs">Faktury opłacone Przelewem w tym miesiącu</div>
      <q-virtual-scroll :virtual-scroll-item-size="48"
      :virtual-scroll-sticky-size-start="48"
      :virtual-scroll-sticky-size-end="32" type="table" visible dense :items="invoicesTransfer" >
        <template v-slot:before>
          <thead class="thead-sticky full-width">
            <tr>
              <th class="text-left">lp</th>
              <th class="text-left"><div>Nazwa</div><div>Sprzedawcy</div></th>
              <th class="text-left">numer</th>
              <th class="text-left"><div>data</div><div>wystawienia</div></th>
              <th class="text-left"><div>data</div><div>opłacenia</div></th>
              <th class="text-left">opis</th>
              <th class="text-left">kwota</th>
              <th class="text-left">kategoria</th>
            </tr>
          </thead>
        </template>
                <template v-slot:after>
        <tfoot class="tfoot-sticky text-left">
            <tr>
              <th class="text-left"></th>
              <th class="text-left"></th>
              <th class="text-left"></th>
              <th class="text-left"></th>
              <th class="text-left"></th>
              <th class="text-left"></th>
              <th class="text-left">{{amountSumTransfer}} zł</th>
              <th class="text-left"></th>
            </tr>
        </tfoot>
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
              <td>{{item.categoryName}}</td>
            </tr>
        </template>
      </q-virtual-scroll>
      </div>
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
<style src="src\style\style.scss" lang="scss">
</style>

<script>
import { defineComponent } from "vue";
import App from "src/App.vue";
const stringOptions = [];
export default defineComponent({
  name: "InvoicesPage",

  created() {
    this.getSellersListNames();
    this.getSellersListNip();
    this.getAllInvoices(true);
    this.getAllInvoices(false);
    this.getCategories();
  },
  data() {
    return {
      bill_invoice: true,
      transfer_cash: true,
      dateOfExposed: "",
      dateOfPayment: "",
      invoiceNumber: "",
      amount: "",
      description: "",
      name: "",
      nip: "",
      categoryName: null,
      sellerName: null,
      sellerNip: null,
      filtersCategory: [],
      filtersNames: [],
      filtersNip: [],
      invoicesCash: [],
      invoicesTransfer: [],
      categories: [],
      options: [],
      optionsCategories: [],
      amountSumCash: "",
      amountSumTransfer: "",
      message: "",
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
    getAllInvoices(transfer_cash) {
      fetch("http://" + this.local + "/invoice/getAllFromMonth?transfer_cash=" + transfer_cash, {
        method: "GET",
      }).then((response) => {
        response.json().then((response) => {
          if (transfer_cash){
            this.invoicesCash = response;
            for (var i = 0; i < this.invoicesCash.length; i++) {
              this.amountSumCash = Number(this.amountSumCash) + Number(this.invoicesCash[i].amount);
            }
          }
          if (!transfer_cash){
            this.invoicesTransfer = response;
            for (var i = 0; i < this.invoicesCash.length; i++) {
              this.amountSumTransfer = Number(this.amountSumTransfer) + Number(this.invoicesTransfer[i].amount);
            }
          }
        });
      });
    },
    getSellersListNames() {
      fetch("http://" + this.local + "/seller/getAllSellersListNames", {
        method: "GET",
      }).then((response) => {
        response.json().then((response) => {
          this.filtersNames = response;
        });
      });
    },
    getSellersListNip() {
      fetch("http://" + this.local + "/seller/getAllSellersListNip", {
        method: "GET",
      }).then((response) => {
        response.json().then((response) => {
          this.filtersNip = response;
        });
      });
    },
    getCategories() {
      fetch("http://" + this.local + "/category/getAll", {
        method: "GET",
      }).then((response) => {
        response.json().then((response) => {
          this.categories = response;
        });
      });
    },
    createInvoice(name, nip) {
      const data = {
        bill_invoice: this.bill_invoice,
        transfer_cash: this.transfer_cash,
        dateOfExposed: this.dateOfExposed.replace(/\//gi, '-'),
        dateOfPayment: this.dateOfPayment.replace(/\//gi, '-'),
        number: this.invoiceNumber,
        amount: this.amount.replace(/\,/gi, '.'),
        description: this.description,
        categoryName: this.categoryName,
      };
      fetch("http://" + this.local + "/invoice/create?sellerName=" + name + "&sellerNIP=" + nip, {
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
            this.getAllInvoices(true);
            this.getAllInvoices(false);
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
            this.getSellersListNames();
            this.getSellersListNip();
            this.autoClose();
          });
        }
      });
    },
    filterNames(val, update) {
      if (val === "") {
        update(() => {
          const needle = val.toLowerCase();
          this.sellerNip = null;
          this.options = this.filtersNames.filter(
            (v) => v.toLowerCase().indexOf(needle) > -1
          );
        });
        return;
      }
      update(() => {
        const needle = val.toLowerCase();
        this.options = this.filtersNames.filter(
          (v) => v.toLowerCase().indexOf(needle) > -1
        );
      });
    },
    filterNip(val, update) {
      if (val === "") {
        update(() => {
          const needle = val.toLowerCase();
          this.sellerName = null;
          this.options = this.filtersNip.filter(
            (v) => v.toLowerCase().indexOf(needle) > -1
          );
        });
        return;
      }
      update(() => {
        const needle = val.toLowerCase();
        this.options = this.filtersNip.filter(
          (v) => v.toLowerCase().indexOf(needle) > -1
        );
      });
    },
    filterCategory(val, update) {
      if (val === "") {
        update(() => {
          const needle = val.toLowerCase();
          this.optionsCategories = this.categories.filter(
            (v) => v.toLowerCase().indexOf(needle) > -1
          );
        });
        return;
      }
      update(() => {
        const needle = val.toLowerCase();
        this.optionsCategories = this.categories.filter(
          (v) => v.toLowerCase().indexOf(needle) > -1
        );
      });
    },
    createValue (val, done) {
      if (val.length > 0) {
        const model = (this.categories || []).slice()

        val
          .split(/[,;|]+/)
          .map(v => v.trim())
          .filter(v => v.length > 0)
          .forEach(v => {
            if (this.optionsCategories.includes(v) === false) {
              this.optionsCategories.push(v)
            }
            if (model.includes(v) === false) {
              model.push(v)
            }
          })

        done(null)
        this.categories = model
      }
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
