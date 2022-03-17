![dla](/img/dla-logo-full.png)

---

### Where's the action?

* API calls
* WebSockets (via SignalR)

---

### API calls - producing events

```typescript
// ProcessService.ts
@Injectable()
export class ProcessService {
    constructor(private http: Http) {
    }

    private getAll(): Observable<Process[]> {
        this.http.get('/api/order/current')
            .map(response =>  /* new Process()[] */]);
    }
```

```typescript
    private timedProcesses = Observable
        .timer(0, TIMER_HARD_REFRESH_MS)
        .flatMap(() => this.getAll());
```

<!-- .element class="fragment" data-fragment-index="0" -->

```typescript
    public processes: Observable<Process[]> = this.timedProcesses;
}
```

<!-- .element class="fragment" data-fragment-index="1" -->

---

![flatMap](/img/flatMap.png)

---

### Consuming the observable events

```ts
@Component({ /* ... */ })
class PlanBoardComponent {
    subscription: Subscription;
    constructor (private processService: ProcessService) { } 
    ngOnInit() {
        this.subscription = this.processService.processes.subscribe(
            processes => this.processes = processes,
            error => console.error('Error! ', error))
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
```

In the view:

<!-- .element class="fragment" data-fragment-index="0" -->

```html
<tr *ngFor="let process of processes">
    <td><la-process-card [model]="process"></la-process-card></td>
    <td *ngFor="let phase of board.phases">
        <la-task-card *ngFor="let task of process.tasks[phase.name]"
         [model]="task" > </la-task-card>
    </td>
</tr>
```

<!-- .element class="fragment" data-fragment-index="0" -->

---

### Review

* Polling API and producing events -> `ProcessService`
* Consuming events -> `PlanBoardComponent`

This worked fine. But we wanted more.

<!-- .element class="fragment" data-fragment-index="0" -->

---

### Real-time events

Introducing... SingalR 

```c#
static void OnSomethingUpdated()
{
    new RealtimeBroadcaster().Broadcast(new SomethingUpdatedEvent());
}
```

All domain events produce a `SomethingUpdatedEvent`

<!-- .element class="fragment" data-fragment-index="0" -->

* Order events
* Task events
* Timer events

<!-- .element class="fragment" data-fragment-index="0" -->

---

### Observable SignalR events

The `SomethingUpdatedEvent` is ideal for an Observable!

```typescript
@Injectable()
export class SignalRService {
    public onSomethingUpdated: Observable<SomethingUpdatedEvent>;
    
    constructor() {
        const connection = $.connection('/signalr/realtime-connection');
        
        this.onSomethingUpdated = new Observable(emitter => {
            connection.received(data => emitter.next(data));
        });
    }
}
```

---

### How to observe these events?

```typescript
@Injectable()
export class ProcessService {
    constructor(private http: Http) {
    }

    private getAll(): Observable<Process[]> { 
        // ...
    }
    private timedProcesses = // ...

    public processes: Observable<Process[]> = this.timedProcesses;
}
```

---

<pre><code class="lang-typescript hljs" data-trim data-noescape>
@Injectable()
export class ProcessService {
    constructor(private http: Http, <mark>private signalRService: SignalRService</mark>) {
    }

    private getAll(): Observable<Process[]> { 
        // ...
    }
    private timedProcesses = // ...

    <mark>private updatedProcesses = this.signalR.onSomethingUpdated
      .flatMap(() => this.getAll());</mark>
  
    public processes = 
        <mark>Observable.merge(this.updatedProcesses, this.timedProcesses);</mark>
}
</code></pre>
