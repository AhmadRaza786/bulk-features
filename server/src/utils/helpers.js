const mapOrdersToSchema = (orders, vendorId) => {
  // Insert vendor_id to all purchase order items
  return orders.map((order) => ({
    ...order,
    vendor_id: vendorId,
  }));
};

const validateOrder = (order) => {
  // Validate order.modal_number as a non-empty string
  if (
    typeof order.modal_number !== "string" ||
    order.modal_number.trim() === ""
  ) {
    return `Modal Number is not valid`;
  }

  // Validate order.unit_price as a decimal value
  if (
    Number(order.unit_price) === NaN ||
    Number.isInteger(Number(order.unit_price))
  ) {
    return `Unit Price ${order.unit_price} is not valid`;
  }

  // Validate order.quantity as an integer
  if (
    Number(order.quantity) === NaN ||
    !Number.isInteger(Number(order.quantity))
  ) {
    return `Quantity ${order.quantity} is not valid`;
  }

  // All conditions passed, the order is valid
  return null;
};

const isValidDate = (dateString) => {
  var dateObj = new Date(dateString);
  return !isNaN(dateObj.getTime());
};

module.exports = { mapOrdersToSchema, validateOrder, isValidDate };
