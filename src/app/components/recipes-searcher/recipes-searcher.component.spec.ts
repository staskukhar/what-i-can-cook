import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipesSearcherComponent } from './recipes-searcher.component';

describe('RecipesSearcherComponent', () => {
  let component: RecipesSearcherComponent;
  let fixture: ComponentFixture<RecipesSearcherComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecipesSearcherComponent]
    });
    fixture = TestBed.createComponent(RecipesSearcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
