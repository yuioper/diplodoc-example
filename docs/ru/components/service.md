# Сервис

Сервис (Service) в системе MDZ — тип операции или услуги, выполняемой в рамках заказа. 

Это центральный элемент системы, определяющий логику работы с заказами, перемещениями и доставками.


```mermaid

quadrantChart
    title Reach and engagement of campaigns
    x-axis Low Reach --> High Reach
    y-axis Low Engagement --> High Engagement
    quadrant-1 We should expand
    quadrant-2 Need to promote
    quadrant-3 Re-evaluate
    quadrant-4 May be improved
    Campaign A: [0.3, 0.6]
    Campaign B: [0.45, 0.23]
    Campaign C: [0.57, 0.69]
    Campaign D: [0.78, 0.34]
    Campaign E: [0.40, 0.34]
    Campaign F: [0.35, 0.78]


```
## Типы сервисов (ServiceType)

| Код                | Описание               |
|---------------------|------------------------|
| MovementIGId        | Перемещение ИГ         |
| DeliveryIGId        | Доставка ИГ            |
| DeliveryWHIGId      | Доставка на склад ИГ   |

## Характеристики сервиса

| Параметр              | Описание                          |
|-----------------------|-----------------------------------|
| Id                    | Уникальный идентификатор          |
| Name                  | Название                          |
| Orders                | Связанные заказы                  |
| OrderStatusType       | Статусы выполнения                |

### Статусы выполнения (OrderStatusType)

| Статус                | Описание                          |
|-----------------------|-----------------------------------|
| Request               | Запрос                            |
| Calculation           | Расчет                            |
| Confirmation          | Подтверждение                     |
| ConfirmationAccept    | Принятие подтверждения            |
| Completion            | Завершение                        |
| CompletionAccept      | Принятие завершения               |

## Финансовые параметры

| Параметр          | Описание                          |
|-------------------|-----------------------------------|
| WorkPrice         | Стоимость работ                   |
| TTPrice           | Стоимость ТТ                      |
| LMPrice           | Стоимость ЛМ                      |
| IntercityPrice    | Межгородовая стоимость            |
| TotalPrice        | Общая стоимость                   |

## Логистические параметры

| Параметр             | Описание                          |
|----------------------|-----------------------------------|
| Vol                  | Объем                             |
| Weight               | Вес                               |
| DistanceToCenter     | Расстояние до центра              |
| TDeliveryType        | Тип доставки                      |
| DocRouteNumber       | Маршрутный номер                  |
| RespPerson           | Ответственное лицо                |

## Планирование

| Параметр                 | Описание                          |
|--------------------------|-----------------------------------|
| DatePlan_WIn             | Плановая дата входа на склад      |
| DatePlan_WOut            | Плановая дата выхода со склада    |
| DatePlan_RCIn            | Плановая дата входа в РЦ          |
| DatePlan_Service         | Плановая дата сервиса             |
| Date_PlanServiceStart    | Плановая дата начала сервиса      |

## Дополнительная информация

| Категория             | Параметры                                      |
|-----------------------|-----------------------------------------------|
| Оборудование          | Equipments (Связанное оборудование)           |
| Адреса                | Addresses (Адреса доставки)                   |
| Контакты              | EmployeeName, EmployeePhone, ManagerName, ManagerPhone |
| Сеть                  | NetworkName, SFIS                             |
| География             | City, CenterCity, WarehouseCity               |