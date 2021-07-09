<template>
  <crm-form-date-item v-if="header.is_date" :header="header" />
  <crm-form-auto-item v-else-if="header.f_table" :header="header" />
  <crm-form-bool-item v-else-if="header.is_bool" :header="header" />
  <crm-form-text-item v-else :header="header" />
</template>

<script>
import CrmFormTextItem from "@/components/CrmFormTextItem";
import CrmFormDateItem from "@/components/CrmFormDateItem";
import CrmFormAutoItem from "@/components/CrmFormAutoItem";
import CrmFormBoolItem from "@/components/CrmFormBoolItem";

export default {
  name: "CrmFormItem",
  components: {
    CrmFormTextItem,
    CrmFormDateItem,
    CrmFormAutoItem,
    CrmFormBoolItem,
  },
  props: {
    header: {
      type: Object,
      required: true,
    },
  },
};
</script>