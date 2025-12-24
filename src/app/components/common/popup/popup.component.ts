import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Subscription, timer} from 'rxjs';

@Component({
  selector: 'popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})

export class PopupComponent implements OnInit, OnDestroy {
  public isVisible = false;
  private timerSubscription: Subscription | null = null;

  constructor(private router: Router) {
  }

  public ngOnInit(): void {
    this.timerSubscription = timer(10000).subscribe(() => {
      this.isVisible = true;
    });
  }

  public close(): void {
    this.isVisible = false;
  }

  public goToCatalog(): void {
    this.isVisible = false;
    this.router.navigate(['/catalog']);
  }

  public ngOnDestroy(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }
}
