import { OnInit, Component, ChangeDetectionStrategy } from '@angular/core';
import { NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { NgbAccordionConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-ng-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [NgbAccordionConfig], // add the NgbAccordionConfig to the component providers
})
export class AccordionComponent implements OnInit {
  exampleAccordion: any;
  exampleOneOpenPanelAtAHome: any;
  exampleTogglePanels: any;
  examplePreventPanelToggle: any;
  exampleGlobalConfigurationOfAccordions: any;

  constructor(config: NgbAccordionConfig) {
    // customize default values of accordions used by this component tree
    // config.closeOthers = true;
    //  config.type = 'info';
  }

  ngOnInit() {
    // this.exampleAccordion = accordion;
    // this.exampleOneOpenPanelAtAHome = oneOpenPanelAtAHome;
    // this.exampleTogglePanels = togglePanels;
    // this.examplePreventPanelToggle = preventPanelToggle;
    // this.exampleGlobalConfigurationOfAccordions = globalConfigurationOfAccordions;
  }

  // api methods
  // ng-methods
  beforeChange($event: NgbPanelChangeEvent) {
    if ($event.panelId === 'preventchange-2') {
      $event.preventDefault();
    }

    if ($event.panelId === 'preventchange-3' && $event.nextState === false) {
      $event.preventDefault();
    }
  }
}
