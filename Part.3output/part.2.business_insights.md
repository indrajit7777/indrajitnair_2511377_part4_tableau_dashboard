# Tableau Calculated Fields and Business Insights

## Calculated fields to create in Tableau

1. **Profit Margin**  
`SUM([profit]) / SUM([sales])`

2. **Cost**  
`SUM([sales]) - SUM([profit])`

3. **Average Order Value**  
`SUM([sales]) / COUNTD([order_id])`

4. **Return Rate**  
`SUM([return_flag]) / COUNTD([order_id])`

5. **Delivery Days**  
`DATEDIFF('day', [order_date], [ship_date])`  
The dataset already has `delivery_days`, but this calculation validates the field.

6. **Shipping Delay Bucket**  
```tableau
IF [delivery_days] <= 1 THEN "0-1 days"
ELSEIF [delivery_days] <= 3 THEN "2-3 days"
ELSEIF [delivery_days] <= 5 THEN "4-5 days"
ELSE "6+ days"
END
```

## 8 Business Insights

1. **Sales trend:** Total sales are **$217,017,652** across **4,200** orders. The highest sales month is **August 2025** at **$10,861,500**, while the lowest is **August 2024** at **$6,303,795**.  
   **Interpretation:** Leadership should check what drove the high month and whether the same campaign, seasonality, or category mix can be repeated.  
   **Action:** Compare campaign channel and category mix between the best and weakest months.

2. **Regional performance:** **South** is the strongest profit region with **$9,987,912** profit. **West** is the weakest with **$7,404,073** profit.  
   **Interpretation:** Regional performance is uneven, so expansion or sales push should not be uniform.  
   **Action:** Review pricing, discounting, product mix, and shipping costs in the weakest region.

3. **Category profitability:** The strongest sub-category is **Technology - Copiers** with **$7,310,055** profit. The weakest is **Office Supplies - Paper** with **$318,707** profit.  
   **Interpretation:** Category strategy should protect high-profit sub-categories and fix or reduce exposure to weak ones.  
   **Action:** Audit discount levels and supplier costs for low-profit sub-categories.

4. **Customer segment behavior:** **Home Office** has the highest return rate at **5.7%**.  
   **Interpretation:** This segment may need better product information, expectation setting, or post-purchase support.  
   **Action:** Build a segment-level returns deep dive by category and shipping mode.

5. **Discount impact:** **Chairs** has the highest average discount at **17.0%** and generated **$1,058,574** profit.  
   **Interpretation:** Heavy discounting may be reducing margin quality even when sales volume looks strong.  
   **Action:** Test discount caps and compare profit margin before and after discount changes.

6. **Shipping performance:** **Standard Class** has the highest average delivery delay at **4.7 days**.  
   **Interpretation:** Slow delivery can affect customer satisfaction, returns, and repeat purchases.  
   **Action:** Review logistics SLA and carrier performance for this ship mode.

7. **Return pattern:** **Furniture** has the highest category return rate at **7.7%**.  
   **Interpretation:** Return risk is not only operational; it may indicate product-quality, expectation, or fit issues.  
   **Action:** Investigate top returned products within this category.

8. **Business risk/opportunity:** Overall profit margin is **15.3%** and return rate is **4.5%**.  
   **Interpretation:** The business has profitable sales, but margin protection and return reduction are key leadership priorities.  
   **Action:** Use the dashboard filters weekly to monitor region-category combinations with high discount, low margin, and high returns.
