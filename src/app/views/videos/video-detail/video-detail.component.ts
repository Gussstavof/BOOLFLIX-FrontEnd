import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VideoModel } from '../../../models/video.model';
import { VideoService } from '../../../services/video/video.service';

@Component({
  selector: 'app-video-detail',
  templateUrl: './video-detail.component.html'
})
export class VideoDetailComponent implements OnInit {
  video?: VideoModel;

  constructor(private route: ActivatedRoute, private videoService: VideoService) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.videoService.getVideoById(id).subscribe((video) => (this.video = video));
  }
}
