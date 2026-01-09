# BigQuery Table Schema (cc3)

Fully-qualified table:
- `govspend1.cc.cc3`

Key fields used by the site dashboard:

- `contract_transaction_unique_key` (STRING)
- `federal_action_obligation` (FLOAT)
- `action_date_fiscal_year` (INT)
- `awarding_sub_agency_name` (STRING)
- `awarding_office_code` (STRING)
- `recipient_uei` (STRING)
- `recipient_name` (STRING)
- `primary_place_of_performance_state_code` (STRING)
- `type_of_contract_pricing` (STRING)
- `prime_award_base_transaction_description` (STRING)
- `product_or_service_code_description` (STRING)
- `naics_code` (INT)
- `naics_description` (STRING)
- `solicitation_procedures` (STRING)
- `veteran_owned_business` (BOOL)
- `woman_owned_business` (BOOL)
- `contracting_officers_determination_of_business_size_code` (STRING)
- `small_disadvantaged_business` (BOOL)
- `c8a_program_participant` (BOOL)
- `historically_underutilized_business_zone_hubzone_firm` (BOOL)
- `usaspending_permalink` (STRING)
- `initial_report_date` (DATE)
- `modification_number` (STRING)

Notes:
- “Small business” is inferred from `contracting_officers_determination_of_business_size_code` (see `functions/api/contracts.ts`).
- Business-type pie buckets are derived from the boolean flags (8(a), HUBZone, SDB, VOSB, WOSB) with precedence to avoid double counting.
