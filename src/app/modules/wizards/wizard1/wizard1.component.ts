import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import KTWizard from '../../../../assets/js/components/wizard';
import { KTUtil } from '../../../../assets/js/components/util';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-wizard1',
  templateUrl: './wizard1.component.html',
  styleUrls: ['./wizard1.component.scss']
})
export class Wizard1Component implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('wizard', { static: true }) el: ElementRef;
  model: any = {
    address1: 'Address Line 1',
    address2: 'Address Line 2',
    postcode: '3000',
    city: 'Melbourne',
    state: 'VIC',
    country: 'AU',
    package: 'Complete Workstation (Monitor, Computer, Keyboard & Mouse)',
    weight: '25',
    width: '110',
    height: '90',
    length: '150',
    delivery: 'overnight',
    packaging: 'regular',
    preferreddelivery: 'morning',
    locaddress1: 'Address Line 1',
    locaddress2: 'Address Line 2',
    locpostcode: '3072',
    loccity: 'Preston',
    locstate: 'VIC',
    loccountry: 'AU',
  };
  submitted = false;
  wizard: any;

  subjectData = [
    {
      chapter: 'Chapter-1 Trigonometry',
      chapterValue: 'chap1',
      content: [
        {
          name: 'Basics of Trigonometry', value: 'Trigo', link: 'https://www.youtube.com/embed/gO2iiwPPJoE', teacher: 'Ram Prasad'
        },
        {
          name: 'Basic concept- I', value: 'linear', link: 'https://www.youtube.com/embed/piTn0JzMhmI', teacher: 'Murli Rao'
        },
        {
          name: 'Basic concept- II', value: 'quadratic', link: 'https://www.youtube.com/embed/DmshIRWkbQQ', teacher: 'Rajat Sharma'
        },
        {
          name: 'Functions of Trigonometry', value: 'poly', link: 'https://www.youtube.com/embed/KXwAOR9s-Mg', teacher: 'Rohini Tyagi'
        },
        {
          name: 'Advance of Trigonometry', value: 'algebra', link: 'https://www.youtube.com/embed/KXwAOR9s-Mg', teacher: 'Mukesh Pal'
        },
      ]
    },
    {
      chapter: 'Chapter-2 Polynominals',
      chapterValue: 'chap2',
      content: [
        {
          name: 'Basics of Polynominals', value: 'Trigo', link: 'https://www.youtube.com/embed/gO2iiwPPJoE', teacher: 'Ram Prasad'
        },
        {
          name: 'Basic concept- I', value: 'linear', link: 'https://www.youtube.com/embed/piTn0JzMhmI', teacher: 'Murli Rao'
        },
        {
          name: 'Basic concept- II', value: 'quadratic', link: 'https://www.youtube.com/embed/DmshIRWkbQQ', teacher: 'Rajat Sharma'
        },
        {
          name: 'Functions of Polynominals', value: 'poly', link: 'https://www.youtube.com/embed/KXwAOR9s-Mg', teacher: 'Rohini Tyagi'
        },
        {
          name: 'Advance of Polynominals', value: 'algebra', link: 'https://www.youtube.com/embed/KXwAOR9s-Mg', teacher: 'Mukesh Pal'
        },
      ]
    },
    {
      chapter: 'Chapter-3 Algebra',
      chapterValue: 'chap3',
      content: [
        {
          name: 'Basics of Algebra', value: 'Trigo', link: 'https://www.youtube.com/embed/gO2iiwPPJoE', teacher: 'Ram Prasad'
        },
        {
          name: 'Basic concept- I', value: 'linear', link: 'https://www.youtube.com/embed/piTn0JzMhmI', teacher: 'Murli Rao'
        },
        {
          name: 'Basic concept- II', value: 'quadratic', link: 'https://www.youtube.com/embed/DmshIRWkbQQ', teacher: 'Rajat Sharma'
        },
        {
          name: 'Functions of Algebra', value: 'poly', link: 'https://www.youtube.com/embed/KXwAOR9s-Mg', teacher: 'Rohini Tyagi'
        },
        {
          name: 'Advance of Algebra', value: 'algebra', link: 'https://www.youtube.com/embed/KXwAOR9s-Mg', teacher: 'Mukesh Pal'
        },
      ]
    }
  ]
  selectedTopic = this.subjectData[0];
  selectedVideo = this.selectedTopic.content[0];
  currentVideoStreamingLink: any;

  constructor(private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.updateSelectedData(0);
  }

  ngAfterViewInit() {
    // Initialize form wizard
    // this.wizard = new KTWizard(this.el.nativeElement, {
    //   startStep: 1
    // });

    // Validation before going to next page
    this.wizard.on('beforeNext', (wizardObj) => {
    });

    // Change event
    this.wizard.on('change', () => {
      setTimeout(() => {
        KTUtil.scrollTop();
      }, 500);
    });
  }

  onTopicChange(event) {
    const foundIndex = this.subjectData.findIndex(elem => elem == event);
    if (foundIndex > -1) {
      this.selectedTopic = this.subjectData[foundIndex];
      this.selectedVideo = this.selectedTopic.content[0];
      this.updateSelectedData(0);
    }
  }

  updateSelectedData(foundIndex) {
    this.currentVideoStreamingLink = this.sanitizer.bypassSecurityTrustResourceUrl(this.selectedTopic.content[foundIndex].link);
  }

  onSubVideoSelection(index) {
    this.updateSelectedData(index);
    this.selectedVideo = this.selectedTopic.content[index];
  }

  onSubmit() {
    this.submitted = true;
  }

  ngOnDestroy() {
    this.wizard = undefined;
  }
}
