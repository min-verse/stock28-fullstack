class HistorialStockDatumSerializer < ActiveModel::Serializer
  attributes :id, :date, :price
  belongs_to :stock
end
