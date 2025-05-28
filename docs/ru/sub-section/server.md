# Серверная часть

## Структура проекта

Проект организован по принципу чистой архитектуры с четким разделением ответственности:

📁 **Mdz.AspNetCore/**  
├── 📁 Binders        → Кастомные биндеры для модели  
├── 📁 Extensions     → Расширения для ASP.NET Core  
├── 📁 Infrastructure → Инфраструктурный код (базы, кеши)  
├── 📁 Middlewares    → Промежуточное ПО (pipeline)  
├── 📁 Pages          → Razor Pages (UI-слой)  
├── 📁 Security       → Безопасность, авторизация, политики  
├── 📁 Services       → Сервисы с бизнес-логикой  
└── 📁 Settings       → Конфигурации (appsettings, env)  

## Авторизация


```mermaid
sequenceDiagram
    participant Client
    participant Auth as AuthService
    participant Users as UsersService
    participant Orders as OrdersService
    participant Files as FileService
    participant Reports as ReportService
    participant DB as Database

    Client->>Auth: Login
    Auth->>DB: Validate Credentials
    DB-->>Auth: User Data
    Auth-->>Client: Auth Token

    Client->>Orders: Create Order
    Orders->>DB: Save Order
    DB-->>Orders: Order Created
    Orders->>Files: Attach Files
    Files->>DB: Save File Metadata
    Orders-->>Client: Order Created

    Client->>Reports: Generate Report
    Reports->>DB: Get Data
    DB-->>Reports: Report Data
    Reports->>Files: Save Report
    Reports-->>Client: Report Generated

```


## Паттерны проектирования

```mermaid
graph TB
    subgraph "Презентационный слой"
        Pages[Pages]
        Controllers[Controllers]
        Views[Views]
    end

    subgraph "Бизнес-логика"
        Auth[AuthService]
        Users[UsersService]
        Orders[OrdersService]
        Companies[CompaniesService]
        Files[FileService]
        Reports[ReportService]
    end

    subgraph "Инфраструктура"
        DB[(Database)]
        FileStorage[File Storage]
        NetworkStorage[Network Storage]
    end

    subgraph "Базовые компоненты"
        Service[Base Service]
        Validator[Model Validator]
        Mapper[AutoMapper]
        UoW[Unit of Work]
    end

    %% Связи презентационного слоя
    Pages --> Auth
    Pages --> Users
    Pages --> Orders
    Pages --> Companies
    Pages --> Files
    Pages --> Reports

    %% Связи сервисов с базовыми компонентами
    Auth --> Service
    Users --> Service
    Orders --> Service
    Companies --> Service
    Files --> Service
    Reports --> Service

    %% Связи базовых компонентов
    Service --> DB
    Service --> Mapper
    Service --> Validator
    Service --> UoW

    %% Связи с хранилищами
    Files --> FileStorage
    Reports --> NetworkStorage

    class Auth,Users,Orders,Companies,Files,Reports service
    class DB,FileStorage,NetworkStorage infrastructure
    class Service,Validator,Mapper,UoW base
    class Pages,Controllers,Views presentation

```
1. Unit of work

```csharp
public class UowMiddleware : IMiddleware
{
    public async Task InvokeAsync(HttpContext context, RequestDelegate next)
    {
        using (var uow = _manager.Begin(new UnitOfWorkOptions
        {
            IsTransactional = shouldEnterTransaction
        }))
        {
            try
            {
                await next(context);
                await uow.Commit();
            }
            catch (Exception)
            {
                await uow.Rollback();
                throw;
            }
        }
    }
}

```


2. Repository

```csharp
public abstract class Service
{
    protected MdlzContext DataContext => _dbContextLazy.Value;
    
    protected Service(IServiceProvider serviceProvider)
    {
        _dbContextProvider = serviceProvider.GetLazyDependency<IDbContextProvider<MdlzContext>>();
        _dbContextLazy = new Lazy<MdlzContext>(() => _dbContextProvider.Service.GetDbContext());
    }
}
```

3. Dependency Injection


```csharp
public static void AddMdz(this IServiceCollection services, IConfiguration configuration)
{
    services.AddMdzCore();
    services.AddAssemblyOf<IModel>();
    services.AddValidatorsFromAssembly(typeof(IModel).Assembly);
    services.AddDataServices(configuration["DatabaseSettings:ConnectionString"]);
    // ... другие сервисы
}
```

## Базовые классы 


```mermaid
flowchart LR
    A-- This is the text! ---B


```

```mermaid
flowchart TB
    subgraph "Презентационный слой"
        Pages[Pages]
        Controllers[Controllers]
        Views[Views]
    end

    subgraph "Бизнес-логика"
        Auth[AuthService]
        Users[UsersService]
        Orders[OrdersService]
        Companies[CompaniesService]
        Files[FileService]
        Reports[ReportService]
    end

    subgraph "Инфраструктура"
        DB[(Database)]
        FileStorage[File Storage]
        NetworkStorage[Network Storage]
    end

    subgraph "Базовые компоненты"
        Service[Base Service]
        Validator[Model Validator]
        Mapper[AutoMapper]
        UoW[Unit of Work]
    end

    %% Связи презентационного слоя
    Pages --> Auth
    Pages --> Users
    Pages --> Orders
    Pages --> Companies
    Pages --> Files
    Pages --> Reports

    %% Связи сервисов с базовыми компонентами
    Auth --> Service
    Users --> Service
    Orders --> Service
    Companies --> Service
    Files --> Service
    Reports --> Service

    %% Связи базовых компонентов
    Service --> DB
    Service --> Mapper
    Service --> Validator
    Service --> UoW

    %% Связи с хранилищами
    Files --> FileStorage
    Reports --> NetworkStorage

    class Auth,Users,Orders,Companies,Files,Reports service
    class DB,FileStorage,NetworkStorage infrastructure
    class Service,Validator,Mapper,UoW base
    class Pages,Controllers,Views presentation

```