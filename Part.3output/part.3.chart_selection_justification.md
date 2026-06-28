# Chart Selection Justification

## Sales Trend View

- **Question answered:** How are sales and profit changing over time?
- **Chart type:** Line chart.
- **Fields used:** `order_date` on time axis, `sales` and `profit` as measures.
- **Design principle:** Time-based measures are easiest to compare with lines.
- **Mistake avoided:** I did not use a pie chart because it cannot show monthly movement clearly.

## Regional Performance View

- **Question answered:** Which region is performing best or worst?
- **Chart type:** Horizontal bar chart.
- **Fields used:** `region`, `sales`, `profit`.
- **Design principle:** Sorting by profit makes regional comparison easy for leadership.
- **Mistake avoided:** I avoided overcrowded labels and decorative chart types.

## Category Profitability View

- **Question answered:** Which categories and sub-categories drive profit or losses?
- **Chart type:** Horizontal bar chart.
- **Fields used:** `category`, `sub_category`, `profit`.
- **Design principle:** Bars make positive and negative profitability easy to compare.
- **Mistake avoided:** I did not rely only on sales because high sales can still have poor profit.

## Customer Segment View

- **Question answered:** Which customer segments have better performance and return risk?
- **Chart type:** Bar chart / highlight table in Tableau.
- **Fields used:** `customer_segment`, `sales`, `profit`, `return_flag`, `Return Rate`.
- **Design principle:** Segment comparison should be simple and readable.
- **Mistake avoided:** I avoided too many dimensions in one visual.

## Shipping Performance View

- **Question answered:** Which shipping modes create longer delivery delays?
- **Chart type:** Bar chart by ship mode and delay bucket.
- **Fields used:** `ship_mode`, `delivery_days`, `Shipping Delay Bucket`, `profit`, `return_flag`.
- **Design principle:** Delay buckets simplify operational interpretation.
- **Mistake avoided:** I avoided showing only average delay without order volume context.

## Discount vs Profit View

- **Question answered:** How does discount relate to profit?
- **Chart type:** Scatter plot.
- **Fields used:** `discount` on x-axis, `profit` on y-axis, category or region as color/filter.
- **Design principle:** Scatter plots are appropriate for relationship analysis between two numeric fields.
- **Mistake avoided:** I avoided implying causation; the chart shows association only.

## Return Analysis View

- **Question answered:** Where are returns concentrated?
- **Chart type:** Bar chart or highlight table.
- **Fields used:** `return_flag`, `category`, `region`, `customer_segment`, `Return Rate`.
- **Design principle:** Return rate is better than raw returns because it controls for order volume.
- **Mistake avoided:** I did not use raw counts alone because high-volume categories naturally have more returns.

## Dashboard Filters and Interactions

- **Filters used:** Region, Category, Customer Segment, Date, Ship Mode, Campaign Channel.
- **Action/filter interaction:** Selecting a region or category filters the other charts.
- **Design principle:** Interactive filtering helps leaders move from summary to root-cause analysis.
- **Mistake avoided:** I avoided making every chart independent with no business flow.
