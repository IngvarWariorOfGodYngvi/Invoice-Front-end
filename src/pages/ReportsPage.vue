<template>
  <q-page>
    <q-item><div class="text-h4 text-bold text-center full-width">Raporty</div></q-item>
    <div class="row full-width">
    <div class="col full-width">
    <q-item class="full-width" dense><q-select v-model="year" :options="years" dense filled use-input hide-selected fill-input input-debounce="0" stack-label label="Wybierz rok" class="col"></q-select></q-item>
    <q-item class="full-width" dense><q-select v-model="reportType" :options="options" dense filled use-input hide-selected fill-input input-debounce="0" label="Wybierz rodzaj raportu" class="col"></q-select></q-item>
    <q-item v-if="reportType == options[0]&& year!=''" class="full-width" dense><q-select v-model="month" :options="months" dense filled use-input hide-selected fill-input input-debounce="0" label="Wybierz miesiąc" class="col"></q-select></q-item>
    <q-item v-if="reportType == options[1]" class="full-width" dense><q-select v-model="quartal" :options="quartals" dense filled use-input hide-selected fill-input input-debounce="0" label="Wybierz miesiące" class="col"></q-select></q-item>
      </div>
    <div class="col">
      <q-btn color="primary" label="wczytaj raport" @click="getReportWithParams(reportType, year,month)"></q-btn>
      </div>
    </div>
    <div>
      <q-item>
        <q-field class="col-3" label="Rozchody z faktur - KLUB" standout="bg-grey-3 text-black" stack-label>
          <div class="self-center col full-width no-outline text-left text-black" tabindex="0">{{viewCurrency(report.outgoingsFromInvoices_Club)}}</div>
        </q-field>
        <q-field class="col-3" label="Rozchody z faktur - Biuro" standout="bg-grey-3 text-black" stack-label>
          <div class="self-center col full-width no-outline text-left text-black" tabindex="0">{{viewCurrency(report.outgoingsFromInvoices_Office)}}</div>
        </q-field>
        <q-field class="col-3" label="Suma rozchodów" standout="bg-grey-3 text-black" stack-label>
          <div class="self-center col full-width no-outline text-left text-black" tabindex="0">{{viewCurrency(report.totalExpenses)}}</div>
        </q-field>
      </q-item>
      <q-item>
        <q-field class="col-3" label="Przychody z kasy - KLUB" standout="bg-grey-3 text-black" stack-label>
          <div class="self-center col full-width no-outline text-left text-black" tabindex="0">{{viewCurrency(report.revenuesFromCashDesk)}}</div>
        </q-field>
        <q-field class="col-3" label="Przychody z wpłat na KP i do Biura" standout="bg-grey-3 text-black" stack-label>
          <div class="self-center col full-width no-outline text-left text-black" tabindex="0">{{viewCurrency(report.revenueFromOffice)}}</div>
        </q-field>
        <q-field class="col-3" label="Suma Przychodów" standout="bg-grey-3 text-black" stack-label>
          <div class="self-center col full-width no-outline text-left text-black" tabindex="0">{{viewCurrency(report.totalIncome)}}</div>
        </q-field>
      </q-item>
      <q-item class="text-bold">
        <q-item class="col-3"></q-item>
        <q-item class="col-3"></q-item>
        <q-field class="col-3" label="Bilans" standout="bg-grey-3 text-black" stack-label>
          <div class="self-center col full-width no-outline text-left text-black" tabindex="0">{{viewCurrency(odds(report.totalIncome,report.totalExpenses))}}</div>
        </q-field>
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
<style src="src\style\style.scss" lang="scss">
</style>

<script>
import { defineComponent } from "vue";
import App from "src/App.vue";
export default defineComponent({
  name: "ReportsPage",

  created() {
    this.getAllYears();
    this.getAllMonths();
  },
  data() {
    return {
      reportType: "",
      year: new Date().getFullYear(),
      years: [ "2021", "2022", "2023" ],
      quartal: "",
      report: "",
      options: [ "Raport Miesięczny", "Raport Kwartalny", "Raport Roczny" ],
      month: "",
      months: ["styczeń", "luty", "marzec", "kwiecień", "maj", "czerwiec","lipiec", "sierpień", "wrzesień", "październik", "listopad", "grudzień"],
      quartals: [ "styczeń-luty-marzec", "kwiecień-maj-czerwiec", "lipiec-Ssierpień-wrzesień", "październik-listopad-grudzień" ],
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
    odds(a,b) {
      if (a === undefined) {a = "0"}
      if (b === undefined) {b = "0"}
      var numb = Number(a)-Number(b)
      return Number(numb)
    },
    getAllYears() {
      fetch("http://" + this.local + "/report/getYears", {
        method: "GET",
      }).then((response) => {
        response.json().then((response) => {
          this.years = response;
        });
      });
    },
    viewCurrency (money) {
      if (money === undefined) { money = '0'}
      var formatterPL = new Intl.NumberFormat('pl-PL',{style: 'currency', currency: 'PLN'})
      var cash = formatterPL.format(money)
      return cash
    },
    getAllMonths() {
      fetch("http://" + this.local + "/report/getMonths", {
        method: "GET",
      }).then((response) => {
        response.json().then((response) => {
          this.months = response;
        });
      });
    },
    getReportWithParams(reportType, year,month) {
      fetch("http://" + this.local + "/report/getReport?reportType=" + reportType + "&year=" + year + "&month=" + month, {
        method: "GET",
      }).then((response) => {
        response.json().then((response) => {
          this.report = response;
        });
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
