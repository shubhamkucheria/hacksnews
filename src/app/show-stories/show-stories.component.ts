import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Story } from "../models/story.model";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";
import { HackernewsApiService } from "../services/hackernews-api.service";

@Component({
  selector: "app-show-stories",
  templateUrl: "./show-stories.component.html",
  styleUrls: ["./show-stories.component.scss"]
})
export class ShowStoriesComponent implements OnInit {
  
  @ViewChild('myCanvas')
  public canvas: ElementRef;
  public context: CanvasRenderingContext2D;
  public chartType: string = 'line';
  public chartData: any[];
  public chartLabels: any[];
  public chartColors: any[];
  public chartOptions: any;
  public chartenable : boolean =false;
 
  public id = [];
  public count = [];
  

  ngOnInit() {
    this.feed = this.activatedRoute.snapshot.data.feed;
    this.activatedRoute.url.subscribe(data => (this.routerLink = data[0].path));
    this.activatedRoute.params.subscribe(params => {
      this.grabbingContent = true;
      this.pageNum = params["page"] ? +params["page"] : 1;
      this.getFeed(this.feed, this.pageNum);     
    });
    this.title.setTitle(`${this.feed} | Hacks News`);
  };


  stories: Story[];
  feed : string;
  pageNum : number;
  listStart : number;
  routerLink : string;
  grabbingContent = true;

  constructor(
    private apiService: HackernewsApiService,
    private title: Title,
    private activatedRoute: ActivatedRoute
  ) {}

  receiveMessage($event) {
    let id = $event;
    console.log($event);
    this.stories.find(v => {
      if(v.id == id) {
          if(!v['voted']) {
              v['voted'] = true;
              v.points++;
          }
          
      }
  });
  this.showGraph();
  }


  receiveMessaged($event) {
    let id = $event;
    this.stories.find(v => {
      if(v.id == id) {
          if(v['voted']) {
              delete v['voted'];
              v.points--;
          }
          
      }
  });
  this.showGraph();
  }


  showGraph() {
    this.id = this.stories.map(i=>{return i.id+'/'+(i.user || 'anonymous user')});
    this.count = this.stories.map(i=>i.points);
    this.chartData = [{
      data: this.count,      
      label: 'Votes',
      fill: true
    }];
    this.chartLabels = this.id;
    this.chartColors = [{
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
         borderColor: 'rgba(0, 0, 0, 1)'
    }];
    this.chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
            stepSize: 1
          }
        }]
      },
      annotation: {
         drawTime: 'beforeDatasetsDraw',
         annotations: [{
            type: 'box',
            id: 'a-box-1',
            yScaleID: 'y-axis-0',
            yMin: 0,
            yMax: 1,
            backgroundColor: '#4cf03b'
         }]
      }
    }
    this.chartenable = true;
  }

  getFeed(feed, pgNum) {
    return this.apiService.getFeed(feed, pgNum).subscribe(
      data => {
        this.stories = data;
        this.grabbingContent = false;
        this.id = this.stories.map(i=>{return i.id+'/'+(i.user || 'anonymous user')});
        this.count = this.stories.map(i=>i.points).filter(i=>i);
        this.showGraph();
      },
      err => console.log(err),
      () => {
        this.listStart = (this.pageNum - 1) * 30 + 1;
        window.scrollTo(0, 0);
      }
    );
  }
}
