<!-- src/pages/PagePaymentHistory.vue -->
<template>
  <page>
    <page-header>
      <template #title> Payment History </template>
    </page-header>
    <page-body>
      <div class="constrain q-pt-lg q-pb-md q-pl-lg q-pr-lg">
        <div class="row q-col-gutter-lg">
          <!-- Payment Summary -->
          <div class="col-12">
            <q-card class="q-mb-md">
              <q-card-section>
                <div class="text-gradient text-h6">Payment Summary</div>
              </q-card-section>
              <q-card-section>
                <div>
                  <strong>Total Payments:</strong>
                  {{ paymentSummary.totalPayments }}
                </div>
                <div>
                  <strong>Total Amount:</strong>
                  {{ formattedTotalAmount }}
                </div>
              </q-card-section>
            </q-card>
          </div>
          <!-- Payment History List -->
          <div class="col-12">
            <q-card class="q-mb-md">
              <q-card-section>
                <div class="text-gradient text-h6">Payment History</div>
              </q-card-section>
              <q-card-section>
                <q-table
                  :rows="payments"
                  :columns="columns"
                  row-key="id"
                  v-model:pagination="pagination"
                >
                  <template v-slot:body-cell-amount="props">
                    <q-td :props="props">
                      {{ formatCurrency(props.row.amount) }}
                    </q-td>
                  </template>
                </q-table>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
      <div class="page-body-spacer-footer"></div>
    </page-body>
  </page>
</template>

<script>
import { defineComponent, ref, onMounted, computed } from "vue";
import Page from "src/components/PagePlumComponent/Page.vue";
import PageHeader from "src/components/PagePlumComponent/PageHeader.vue";

export default defineComponent({
  components: { Page, PageHeader },
  name: "PaymentHistory",
  setup() {
    const payments = ref([]);
    const paymentSummary = ref({
      totalPayments: 0,
      totalAmount: 0,
    });
    const columns = [
      {
        name: "date",
        required: true,
        label: "Date",
        align: "left",
        field: (row) => row.date,
        format: (val) => val,
        sortable: true,
      },
      {
        name: "description",
        required: true,
        label: "Description",
        align: "left",
        field: (row) => row.description,
        format: (val) => val,
        sortable: true,
      },
      {
        name: "amount",
        required: true,
        label: "Amount",
        align: "right",
        field: (row) => row.amount,
        format: (val) => val,
        sortable: true,
      },
    ];
    const pagination = ref({
      page: 1,
      rowsPerPage: 10,
    });

    const fetchPayments = async () => {
      // Logic to fetch payment history from the API
      // Example data for illustration purposes:
      const data = [
        { id: 1, date: "2024-01-01", description: "Job Payment", amount: 200 },
        { id: 2, date: "2024-01-15", description: "Refund", amount: -20 },
      ];
      payments.value = data;
      paymentSummary.value.totalPayments = data.length;
      paymentSummary.value.totalAmount = data.reduce(
        (sum, payment) => sum + payment.amount,
        0,
      );
    };

    const formatCurrency = (value) => {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(value);
    };

    const formattedTotalAmount = computed(() =>
      formatCurrency(paymentSummary.value.totalAmount),
    );

    onMounted(() => {
      fetchPayments();
    });

    return {
      payments,
      paymentSummary,
      columns,
      pagination,
      formatCurrency,
      formattedTotalAmount,
    };
  },
});
</script>
