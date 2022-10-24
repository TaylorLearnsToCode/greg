import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MenuItem } from '@shared/model/menu-item.model';
import { getTestMenuItem } from '@test/menu-item.mock';
import { MenuBarComponent } from './menu-bar.component';

describe('MenuBarComponent', () => {
  let component: MenuBarComponent;
  let fixture: ComponentFixture<MenuBarComponent>;
  let mockItemRef: MenuItem;
  let mockParentItem: MenuItem;
  let router: Router;
  let routerSpy: jasmine.Spy;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [MenuBarComponent],
      imports: [RouterTestingModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    mockItemRef = getTestMenuItem();
    mockParentItem = getTestMenuItem('parent');
    mockParentItem.children = [mockItemRef, getTestMenuItem('2')];
    router = TestBed.inject(Router);
    routerSpy = spyOn(router, 'navigate').and.callFake(
      () => new Promise((resolve) => resolve(true))
    );

    fixture = TestBed.createComponent(MenuBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    routerSpy.calls.reset();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('clickMenuItem', () => {
    let lastComponentMenuItem: MenuItem;

    beforeEach(
      () =>
        (lastComponentMenuItem =
          component.menuItems[component.menuItems.length - 1])
    );

    it('should route to an item', () => {
      mockItemRef.routerLink = mockItemRef.id;
      component.clickMenuItem(mockItemRef);
      expect(router.navigate).toHaveBeenCalledWith([mockItemRef.routerLink]);
    });

    it('should close the parent menu on navigation', () => {
      component.clickMenuItem(mockItemRef, mockParentItem);
      expect(mockParentItem.isExpanded).toBe(false);
    });

    it('should expand a route option family', () => {
      component.clickMenuItem(lastComponentMenuItem);
      expect(lastComponentMenuItem.isExpanded).toBe(true);
    });

    it('should contract a route option family', () => {
      lastComponentMenuItem.isExpanded = true;
      component.clickMenuItem(lastComponentMenuItem);
      expect(lastComponentMenuItem.isExpanded).toBe(false);
    });
  });
});